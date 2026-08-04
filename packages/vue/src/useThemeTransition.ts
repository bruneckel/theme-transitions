import { computed, onScopeDispose, ref } from 'vue';
import {
	getController,
	originFromEvent,
} from '@bruneckel/theme-transitions-core';
import type {
	ThemeMode,
	ThemeOptions,
	TransitionOptions,
} from '@bruneckel/theme-transitions-core';

const toOptions = (
	eventOrOptions?: MouseEvent | TransitionOptions,
): TransitionOptions => {
	if (eventOrOptions instanceof MouseEvent) {
		return { origin: originFromEvent(eventOrOptions) };
	}

	return eventOrOptions ?? {};
};

export const useThemeTransition = (options?: ThemeOptions) => {
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
		toggleTheme: (eventOrOptions?: MouseEvent | TransitionOptions) =>
			controller.toggleTheme(toOptions(eventOrOptions)),
		setTheme: (
			mode: ThemeMode,
			eventOrOptions?: MouseEvent | TransitionOptions,
		) => controller.setTheme(mode, toOptions(eventOrOptions)),
	};
};
