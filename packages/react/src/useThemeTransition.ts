import { useCallback, useSyncExternalStore } from 'react';
import { getController, resolveOptions } from '@bruneckel/theme-transitions-core';
import type {
	ThemeMode,
	ThemeOptions,
	TransitionOptions,
} from '@bruneckel/theme-transitions-core';

export const useThemeTransition = (opts?: ThemeOptions) => {
	const controller = getController(opts);

	const state = useSyncExternalStore(controller.subscribe, controller.getState);

	const toggleTheme = useCallback(
		(eventOrOpts?: React.MouseEvent | TransitionOptions) =>
			controller.toggleTheme(resolveOptions(eventOrOpts)),
		[controller],
	);

	const setTheme = useCallback(
		(mode: ThemeMode, eventOrOpts?: React.MouseEvent | TransitionOptions) =>
			controller.setTheme(mode, resolveOptions(eventOrOpts)),
		[controller],
	);

	return {
		theme: state.theme,
		mode: state.mode,
		isAnimating: state.isAnimating,
		toggleTheme,
		setTheme,
	};
};
