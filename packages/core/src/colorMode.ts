import type { ThemeMode } from './types';

const STORAGE_KEY = 'theme';

export const getSystemTheme = (): 'light' | 'dark' => {
	if (typeof matchMedia === 'undefined') {
		return 'light';
	}

	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const resolveTheme = (preference: ThemeMode): 'light' | 'dark' => {
	return preference === 'system' ? getSystemTheme() : preference;
};

export const readStoredPreference = (): ThemeMode => {
	if (typeof globalThis.window === 'undefined') {
		return 'system';
	}

	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
};

export const writeStoredPreference = (preference: ThemeMode): void => {
	if (typeof window === 'undefined') {
		return;
	}

	localStorage.setItem(STORAGE_KEY, preference);
};

export const applyThemeClass = (value: 'light' | 'dark'): void => {
	if (typeof document === 'undefined') {
		return;
	}

	const root = document.documentElement;
	root.classList.add(value);
	root.classList.remove(value === 'dark' ? 'light' : 'dark');
};

const DANGEROUS_TOKEN = /\btypeof window\b/;

export const buildColorModeInitScript = (): string => {
	const script = `(function () {
	var STORAGE_KEY = ${JSON.stringify(STORAGE_KEY)};
	var getSystemTheme = ${getSystemTheme.toString()};
	var resolveTheme = ${resolveTheme.toString()};
	var readStoredPreference = ${readStoredPreference.toString()};
	var applyThemeClass = ${applyThemeClass.toString()};
	applyThemeClass(resolveTheme(readStoredPreference()));
})();`;

	if (DANGEROUS_TOKEN.test(script)) {
		throw new Error(
			'theme-transitions-core: generated init script contains the literal text "typeof window", which some server bundlers textually replace with "undefined" and corrupt this script. Use `typeof globalThis.window`, `typeof matchMedia`, or `typeof localStorage` instead in whichever function introduced it.',
		);
	}

	return script;
};
