import { onMounted, onUnmounted, useRuntimeConfig, useState } from '#imports';
import { getController } from '@bruneckel/theme-transitions-core';
import type {
	ThemeController,
	ThemeMode,
	TransitionOptions,
} from '@bruneckel/theme-transitions-core';

export type { ThemeOrigin, TransitionOptions } from '@bruneckel/theme-transitions-core';

export const useThemeTransition = () => {
	const moduleOptions = useRuntimeConfig().public.themeTransition;

	const theme = useState<'light' | 'dark'>('theme-transition-color', () => 'light');
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
			isAnimating.value = state.isAnimating;
		};

		sync();
		const unsubscribe = controller.subscribe(sync);
		onUnmounted(unsubscribe);
	});

	const toggleTheme = async (options?: TransitionOptions) => {
		await requireController().toggleTheme(options);
	};

	const setTheme = async (mode: ThemeMode, options?: TransitionOptions) => {
		await requireController().setTheme(mode, options);
	};

	return {
		theme,
		isAnimating,
		toggleTheme,
		setTheme,
	};
};
