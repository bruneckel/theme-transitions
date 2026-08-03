import type {
	ThemeMode,
	ThemeTransitionModuleOptions,
	ThemeTransitionOptions,
} from './types';
import { getEffectOrThrow, resolveThemeTransitionEffects } from './effects';
import {
	applyThemeClass,
	readStoredPreference,
	resolveTheme,
	writeStoredPreference,
} from './colorMode';
import { runThemeTransition } from './runThemeTransition';

export interface ThemeTransitionState {
	theme: 'light' | 'dark';
	isAnimating: boolean;
}

export interface ThemeTransitionController {
	getState: () => ThemeTransitionState;
	subscribe: (listener: () => void) => () => void;
	toggleTheme: (options?: ThemeTransitionOptions) => Promise<void>;
	setTheme: (mode: ThemeMode, options?: ThemeTransitionOptions) => Promise<void>;
}

export const createController = (
	options?: ThemeTransitionModuleOptions,
): ThemeTransitionController => {
	const effects = resolveThemeTransitionEffects(options);
	const configVariant = options?.variant ?? 'fade';

	let state: ThemeTransitionState = {
		theme: resolveTheme(readStoredPreference()),
		isAnimating: false,
	};

	const listeners = new Set<() => void>();
	const notify = () => {
		for (const listener of listeners) {
			listener();
		}
	};

	const setState = (partial: Partial<ThemeTransitionState>) => {
		state = { ...state, ...partial };
		notify();
	};

	if (typeof matchMedia !== 'undefined') {
		const media = matchMedia('(prefers-color-scheme: dark)');
		media.addEventListener('change', () => {
			if (readStoredPreference() !== 'system') {
				return;
			}

			const resolved = resolveTheme('system');
			applyThemeClass(resolved);
			setState({ theme: resolved });
		});
	}

	const applyTheme = async (
		nextMode: ThemeMode,
		callOptions: ThemeTransitionOptions = {},
	) => {
		const variant = callOptions.variant ?? configVariant;
		const definition = getEffectOrThrow(variant);
		const origin = callOptions.origin ?? null;

		if (definition.requiresOrigin && !origin) {
			throw new Error(`Theme variant "${variant}" requires an origin point`);
		}

		await runThemeTransition(
			definition,
			origin,
			effects[variant],
			() => {
				const resolved = resolveTheme(nextMode);
				writeStoredPreference(nextMode);
				applyThemeClass(resolved);
				setState({ theme: resolved });
			},
			isAnimating => setState({ isAnimating }),
		);
	};

	const toggleTheme = async (callOptions: ThemeTransitionOptions = {}) => {
		if (state.isAnimating) {
			return;
		}

		const nextMode = state.theme === 'dark' ? 'light' : 'dark';
		await applyTheme(nextMode, callOptions);
	};

	const setTheme = async (
		mode: ThemeMode,
		callOptions: ThemeTransitionOptions = {},
	) => {
		if (state.isAnimating) {
			return;
		}

		if (mode !== 'system' && state.theme === mode) {
			return;
		}

		await applyTheme(mode, callOptions);
	};

	return {
		getState: () => state,
		subscribe: (listener) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		toggleTheme,
		setTheme,
	};
};

let sharedController: ThemeTransitionController | undefined;

export const getController = (
	options?: ThemeTransitionModuleOptions,
): ThemeTransitionController => {
	sharedController ??= createController(options);
	return sharedController;
};
