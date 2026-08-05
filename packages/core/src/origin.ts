import type { ThemeOrigin } from './types';

export type EventLike = {
	clientX: number;
	clientY: number;
};

export const originFromEvent = (event: EventLike): ThemeOrigin => ({
	x: event.clientX,
	y: event.clientY,
});

export const originFromElement = (
	element: HTMLElement | null,
): ThemeOrigin | null => {
	if (!element) {
		return null;
	}

	const rect = element.getBoundingClientRect();

	return {
		x: rect.left + rect.width / 2,
		y: rect.top + rect.height / 2,
	};
};
