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

	it('returns "system" when nothing is stored', () => {
		vi.stubGlobal('window', {});
		vi.stubGlobal('localStorage', createLocalStorageMock());
		expect(readStoredPreference()).toBe('system');
	});

	it('returns the stored value verbatim, including a custom theme name', () => {
		vi.stubGlobal('window', {});
		vi.stubGlobal('localStorage', createLocalStorageMock());
		localStorage.setItem('tt:theme', 'pink');
		expect(readStoredPreference()).toBe('pink');
	});

	it('falls back to "system" when the stored value contains whitespace', () => {
		vi.stubGlobal('window', {});
		vi.stubGlobal('localStorage', createLocalStorageMock());
		localStorage.setItem('tt:theme', 'not a valid token');
		expect(readStoredPreference()).toBe('system');
	});
});

describe('writeStoredPreference', () => {
	it('does nothing when window is unavailable', () => {
		vi.stubGlobal('window', undefined);
		expect(() => writeStoredPreference('dark')).not.toThrow();
	});

	it('persists the preference under the "tt:theme" key', () => {
		vi.stubGlobal('window', {});
		const localStorageMock = createLocalStorageMock();
		vi.stubGlobal('localStorage', localStorageMock);
		writeStoredPreference('light');
		expect(localStorageMock.getItem('tt:theme')).toBe('light');
	});
});

describe('applyThemeClass', () => {
	it('does nothing when document is unavailable', () => {
		vi.stubGlobal('document', undefined);
		expect(() => applyThemeClass('dark')).not.toThrow();
	});

	it('adds the new class and, when given a previous value, removes it', () => {
		const documentMock = createDocumentMock();
		vi.stubGlobal('document', documentMock);
		applyThemeClass('dark');
		expect(documentMock.classes.has('dark')).toBe(true);

		applyThemeClass('light', 'dark');
		expect(documentMock.classes.has('light')).toBe(true);
		expect(documentMock.classes.has('dark')).toBe(false);
	});

	it('does not remove anything when no previous value is given', () => {
		const documentMock = createDocumentMock();
		vi.stubGlobal('document', documentMock);
		applyThemeClass('dark');
		applyThemeClass('pink');
		expect(documentMock.classes.has('dark')).toBe(true);
		expect(documentMock.classes.has('pink')).toBe(true);
	});

	it('applies a custom theme name the same way as a built-in one', () => {
		const documentMock = createDocumentMock();
		vi.stubGlobal('document', documentMock);
		applyThemeClass('sunset');
		expect(documentMock.classes.has('sunset')).toBe(true);
	});
});

describe('buildColorModeInitScript', () => {
	it('does not contain the literal text "typeof window"', () => {
		expect(buildColorModeInitScript()).not.toMatch(/\btypeof window\b/);
	});

	it('embeds the storage key and all four helper functions', () => {
		const script = buildColorModeInitScript();
		expect(script).toContain('"tt:theme"');
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

	it('applies a custom stored theme name on a fresh run, not just light/dark', () => {
		vi.stubGlobal('matchMedia', undefined);
		vi.stubGlobal('window', {});
		vi.stubGlobal('localStorage', createLocalStorageMock());
		const documentMock = createDocumentMock();
		vi.stubGlobal('document', documentMock);

		writeStoredPreference('sunset');
		new Function(buildColorModeInitScript())();

		expect(documentMock.classes.has('sunset')).toBe(true);
	});

	it('falls back to the system theme when the stored value contains whitespace, instead of throwing', () => {
		vi.stubGlobal('matchMedia', (query: string) => ({ matches: false, media: query }));
		vi.stubGlobal('window', {});
		vi.stubGlobal('localStorage', createLocalStorageMock());
		const documentMock = createDocumentMock();
		vi.stubGlobal('document', documentMock);

		writeStoredPreference('not a valid token');
		expect(() => new Function(buildColorModeInitScript())()).not.toThrow();

		expect(documentMock.classes.has('light')).toBe(true);
	});

	it('does not reference any identifier from outside the generated script (would break under a minifier that renames module-level bindings)', () => {
		const script = buildColorModeInitScript();
		expect(script).not.toMatch(/\bSTORAGE_KEY\b/);
	});
});
