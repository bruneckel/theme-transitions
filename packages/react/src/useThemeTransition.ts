import { useCallback, useSyncExternalStore } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { getController, resolveOptions } from '@brustack/theme-transitions-core';
import type {
	ThemeName,
	ThemeOptions,
	TransitionOptions,
} from '@brustack/theme-transitions-core';

export const useThemeTransition = (opts?: ThemeOptions) => {
	const controller = getController(opts);

	const state = useSyncExternalStore(controller.subscribe, controller.getState);

	const toggleTheme = useCallback(
		(eventOrOpts?: ReactMouseEvent | TransitionOptions) =>
			controller.toggleTheme(resolveOptions(eventOrOpts)),
		[controller],
	);

	const setTheme = useCallback(
		(mode: ThemeName, eventOrOpts?: ReactMouseEvent | TransitionOptions) =>
			controller.setTheme(mode, resolveOptions(eventOrOpts)),
		[controller],
	);

	return {
		theme: state.theme,
		mode: state.mode,
		isAnimating: state.isAnimating,
		themes: state.themes,
		toggleTheme,
		setTheme,
	};
};
