import { computed, onScopeDispose, ref } from 'vue';
import {
	getController,
	originFromEvent,
} from '@bruneckel/theme-transitions-core';
import type {
	ThemeMode,
	ThemeTransitionModuleOptions,
	ThemeTransitionOptions,
} from '@bruneckel/theme-transitions-core';

const toOptions = (
	eventOrOptions?: MouseEvent | ThemeTransitionOptions,
): ThemeTransitionOptions => {
	if (eventOrOptions instanceof MouseEvent) {
		return { origin: originFromEvent(eventOrOptions) };
	}

	return eventOrOptions ?? {};
};

export const useThemeTransition = (options?: ThemeTransitionModuleOptions) => {
	const controller = getController(options);
	const state = ref(controller.getState());

	const unsubscribe = controller.subscribe(() => {
		state.value = controller.getState();
	});

	onScopeDispose(unsubscribe, true);

	return {
		theme: computed(() => state.value.theme),
		mode: computed(() => state.value.mode),
		isAnimating: computed(() => state.value.isAnimating),
		toggleTheme: (eventOrOptions?: MouseEvent | ThemeTransitionOptions) =>
			controller.toggleTheme(toOptions(eventOrOptions)),
		setTheme: (
			mode: ThemeMode,
			eventOrOptions?: MouseEvent | ThemeTransitionOptions,
		) => controller.setTheme(mode, toOptions(eventOrOptions)),
	};
};
