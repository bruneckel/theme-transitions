import type { ThemeOrigin } from './types';

export const originFromEvent = (event: MouseEvent): ThemeOrigin => ({
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
