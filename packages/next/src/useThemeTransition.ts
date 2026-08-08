'use client';

import { useCallback, useSyncExternalStore } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { getController, resolveOptions } from '@brustack/theme-transitions-core';
import type {
	ThemeName,
	ThemeOptions,
	TransitionOptions,
} from '@brustack/theme-transitions-core';

// Must be a constant, not derived from readStoredPreference()/resolveTheme(): those
// are deliberately environment-aware (they read the real localStorage value when
// called client-side). useSyncExternalStore calls this same function on the client
// during hydration specifically to reproduce what the server rendered, so if it
// read the real client state here, the client's "server-matching" pass and the
// server's actual output would diverge whenever a visitor has a stored preference,
// causing a hydration mismatch. The server can never know a given visitor's stored
// preference, so 'system' resolving to 'light' (matchMedia is unavailable
// server-side) is the only value both sides can agree on. Same reasoning for
// `themes`: a consumer's custom names aren't knowable at module-load time, only
// the 3 built-ins are a safe constant both sides can agree on.
const SERVER_SNAPSHOT = {
	theme: 'light' as const,
	mode: 'system' as const,
	isAnimating: false,
	themes: ['light', 'dark', 'system'],
};
const getServerSnapshot = () => SERVER_SNAPSHOT;

export const useThemeTransition = (opts?: ThemeOptions) => {
	const controller = getController(opts);

	const state = useSyncExternalStore(controller.subscribe, controller.getState, getServerSnapshot);

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
