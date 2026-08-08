import { beforeEach, describe, expect, it, vi } from 'vitest';
import Alpine from 'alpinejs';

const controllerMock = vi.hoisted(() => {
	const state = { theme: 'light', mode: 'light', isAnimating: false, themes: ['light', 'dark', 'system'] };

	return {
		getState: () => state,
		subscribe: () => () => {},
		toggleTheme: vi.fn(async () => {}),
		setTheme: vi.fn(async () => {}),
	};
});

vi.mock('@brustack/theme-transitions-core', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@brustack/theme-transitions-core')>();

	return {
		...actual,
		getController: () => controllerMock,
	};
});

import themeTransition from './index';

beforeEach(() => {
	vi.clearAllMocks();
	document.body.innerHTML = '';
});

describe('themeTransition integration with a real Alpine instance', () => {
	it('renders the controller state and wires up toggleTheme via x-data', async () => {
		document.body.innerHTML = `
			<div x-data="themeTransition()">
				<button id="toggle" @click="toggleTheme" x-text="theme"></button>
			</div>
		`;

		Alpine.plugin(themeTransition as never);
		Alpine.start();
		await Alpine.nextTick();

		const button = document.getElementById('toggle')!;
		expect(button.textContent).toBe('light');

		button.click();
		await Alpine.nextTick();

		expect(controllerMock.toggleTheme).toHaveBeenCalled();
	});
});
