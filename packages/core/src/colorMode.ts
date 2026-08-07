import type { ThemeMode } from './types';

const STORAGE_KEY = 'tt:theme';

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

/**
 * Self-contained duplicate of getSystemTheme/resolveTheme/readStoredPreference/
 * applyThemeClass's logic, stringified via Function.prototype.toString() below
 * to produce the anti-flash init script. Deliberately does not call the
 * exported functions above: those are reached via closure over module-level
 * bindings (STORAGE_KEY, each other), and a consumer's own bundler is free to
 * rename any of those bindings when it minifies its production build. Since
 * this function's stringified text is embedded verbatim in another page's
 * <head>, a renamed closure reference has nothing to resolve to there and
 * throws a ReferenceError. Every name this function touches is declared
 * inside its own body, so no consumer's minifier can rename one copy of a
 * name without renaming every other use of it inside this same function scope.
 */
const initColorMode = (): void => {
	const getSystemTheme = (): 'light' | 'dark' => {
		if (typeof matchMedia === 'undefined') {
			return 'light';
		}

		return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};

	const resolveTheme = (preference: string): 'light' | 'dark' => {
		return preference === 'system' ? getSystemTheme() : (preference as 'light' | 'dark');
	};

	const readStoredPreference = (): string => {
		if (typeof globalThis.window === 'undefined') {
			return 'system';
		}

		const stored = localStorage.getItem('tt:theme');
		return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
	};

	const applyThemeClass = (value: 'light' | 'dark'): void => {
		if (typeof document === 'undefined') {
			return;
		}

		const root = document.documentElement;
		root.classList.add(value);
		root.classList.remove(value === 'dark' ? 'light' : 'dark');
	};

	applyThemeClass(resolveTheme(readStoredPreference()));
};

export const buildColorModeInitScript = (): string => {
	const script = `(${initColorMode.toString()})();`;

	if (DANGEROUS_TOKEN.test(script)) {
		throw new Error(
			'theme-transitions-core: generated init script contains the literal text "typeof window", which some server bundlers textually replace with "undefined" and corrupt this script. Use `typeof globalThis.window`, `typeof matchMedia`, or `typeof localStorage` instead in whichever function introduced it.',
		);
	}

	return script;
};
