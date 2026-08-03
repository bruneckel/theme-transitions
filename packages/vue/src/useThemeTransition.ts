import { computed, onScopeDispose, ref } from 'vue';
import { getController } from '@bruneckel/theme-transitions-core';
import type {
	ThemeMode,
	ThemeTransitionModuleOptions,
	ThemeTransitionOptions,
} from '@bruneckel/theme-transitions-core';

export const useThemeTransition = (options?: ThemeTransitionModuleOptions) => {
	const controller = getController(options);
	const state = ref(controller.getState());

	const unsubscribe = controller.subscribe(() => {
		state.value = controller.getState();
	});

	onScopeDispose(unsubscribe, true);

	return {
		theme: computed(() => state.value.theme),
		isAnimating: computed(() => state.value.isAnimating),
		toggleTheme: (opts?: ThemeTransitionOptions) => controller.toggleTheme(opts),
		setTheme: (mode: ThemeMode, opts?: ThemeTransitionOptions) => controller.setTheme(mode, opts),
	};
};
