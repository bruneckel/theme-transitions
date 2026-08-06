import { onMounted, onUnmounted, useRuntimeConfig, useState } from '#imports';
import { getController, resolveOptions } from '@brustack/theme-transitions-core';
import type {
	ThemeController,
	ThemeMode,
	TransitionOptions,
} from '@brustack/theme-transitions-core';

export type { ThemeOrigin, TransitionOptions } from '@brustack/theme-transitions-core';

export const useThemeTransition = () => {
	const moduleOptions = useRuntimeConfig().public.themeTransition;

	const theme = useState<'light' | 'dark'>('theme-transition-color', () => 'light');
	const mode = useState<ThemeMode>('theme-transition-mode', () => 'system');
	const isAnimating = useState('theme-transition-animating', () => false);

	let controller: ThemeController | undefined;

	const requireController = (): ThemeController => {
		if (!controller) {
			throw new Error(
				'useThemeTransition: toggleTheme/setTheme was called before the component mounted, or outside a browser context.',
			);
		}

		return controller;
	};

	onMounted(() => {
		controller = getController(moduleOptions);

		const sync = () => {
			const state = controller!.getState();
			theme.value = state.theme;
			mode.value = state.mode;
			isAnimating.value = state.isAnimating;
		};

		sync();
		const unsubscribe = controller.subscribe(sync);
		onUnmounted(unsubscribe);
	});

	const toggleTheme = async (eventOrOpts?: MouseEvent | TransitionOptions) => {
		await requireController().toggleTheme(resolveOptions(eventOrOpts));
	};

	const setTheme = async (mode: ThemeMode, eventOrOpts?: MouseEvent | TransitionOptions) => {
		await requireController().setTheme(mode, resolveOptions(eventOrOpts));
	};

	return {
		theme,
		mode,
		isAnimating,
		toggleTheme,
		setTheme,
	};
};
