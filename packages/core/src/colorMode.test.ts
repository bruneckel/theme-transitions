import { afterEach, describe, expect, it, vi } from 'vitest';
import {
	applyThemeClass,
	buildColorModeInitScript,
	getSystemTheme,
	readStoredPreference,
	resolveTheme,
	writeStoredPreference,
} from './colorMode';

const createLocalStorageMock = () => {
	const store = new Map<string, string>();
	return {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => {
			store.set(key, value);
		},
	};
};

const createDocumentMock = () => {
	const classes = new Set<string>();
	return {
		documentElement: {
			classList: {
				add: (value: string) => classes.add(value),
				remove: (value: string) => classes.delete(value),
			},
		},
		classes,
	};
};

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('getSystemTheme', () => {
	it('returns dark when matchMedia reports a dark preference', () => {
		vi.stubGlobal('matchMedia', (query: string) => ({ matches: true, media: query }));
		expect(getSystemTheme()).toBe('dark');
	});

	it('returns light when matchMedia reports no dark preference', () => {
		vi.stubGlobal('matchMedia', (query: string) => ({ matches: false, media: query }));
		expect(getSystemTheme()).toBe('light');
	});

	it('returns light when matchMedia is unavailable', () => {
		vi.stubGlobal('matchMedia', undefined);
		expect(getSystemTheme()).toBe('light');
	});
});

describe('resolveTheme', () => {
	it('resolves "system" via getSystemTheme', () => {
		vi.stubGlobal('matchMedia', (query: string) => ({ matches: true, media: query }));
		expect(resolveTheme('system')).toBe('dark');
	});

	it('passes through explicit light/dark unchanged', () => {
		expect(resolveTheme('light')).toBe('light');
		expect(resolveTheme('dark')).toBe('dark');
	});
});

describe('readStoredPreference', () => {
	it('returns "system" when window is unavailable', () => {
		vi.stubGlobal('window', undefined);
		expect(readStoredPreference()).toBe('system');
	});

	it('returns the stored value when it is a valid ThemeMode', () => {
		vi.stubGlobal('window', {});
		vi.stubGlobal('localStorage', createLocalStorageMock());
		localStorage.setItem('theme', 'dark');
		expect(readStoredPreference()).toBe('dark');
	});

	it('returns "system" for missing or garbage stored values', () => {
		vi.stubGlobal('window', {});
		vi.stubGlobal('localStorage', createLocalStorageMock());
		expect(readStoredPreference()).toBe('system');

		localStorage.setItem('theme', 'not-a-real-mode');
		expect(readStoredPreference()).toBe('system');
	});
});

describe('writeStoredPreference', () => {
	it('does nothing when window is unavailable', () => {
		vi.stubGlobal('window', undefined);
		expect(() => writeStoredPreference('dark')).not.toThrow();
	});

	it('persists the preference under the "theme" key', () => {
		vi.stubGlobal('window', {});
		const localStorageMock = createLocalStorageMock();
		vi.stubGlobal('localStorage', localStorageMock);
		writeStoredPreference('light');
		expect(localStorageMock.getItem('theme')).toBe('light');
	});
});

describe('applyThemeClass', () => {
	it('does nothing when document is unavailable', () => {
		vi.stubGlobal('document', undefined);
		expect(() => applyThemeClass('dark')).not.toThrow();
	});

	it('adds the resolved class and removes the opposite one', () => {
		const documentMock = createDocumentMock();
		vi.stubGlobal('document', documentMock);
		applyThemeClass('dark');
		expect(documentMock.classes.has('dark')).toBe(true);
		expect(documentMock.classes.has('light')).toBe(false);

		applyThemeClass('light');
		expect(documentMock.classes.has('light')).toBe(true);
		expect(documentMock.classes.has('dark')).toBe(false);
	});
});

describe('buildColorModeInitScript', () => {
	it('does not contain the literal text "typeof window"', () => {
		expect(buildColorModeInitScript()).not.toMatch(/\btypeof window\b/);
	});

	it('embeds the storage key and all four helper functions', () => {
		const script = buildColorModeInitScript();
		expect(script).toContain('"theme"');
		expect(script).toContain('getSystemTheme');
		expect(script).toContain('resolveTheme');
		expect(script).toContain('readStoredPreference');
		expect(script).toContain('applyThemeClass');
	});

	it('produces a script that runs correctly against a mocked DOM', () => {
		vi.stubGlobal('matchMedia', undefined);
		vi.stubGlobal('window', {});
		vi.stubGlobal('localStorage', createLocalStorageMock());
		const documentMock = createDocumentMock();
		vi.stubGlobal('document', documentMock);

		writeStoredPreference('dark');
		new Function(buildColorModeInitScript())();

		expect(documentMock.classes.has('dark')).toBe(true);
		expect(documentMock.classes.has('light')).toBe(false);
	});

	it('does not reference any identifier from outside the generated script (would break under a minifier that renames module-level bindings)', () => {
		const script = buildColorModeInitScript();
		expect(script).not.toMatch(/\bSTORAGE_KEY\b/);
	});
});
