import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
	stored: 'light' as 'light' | 'dark' | 'system',
	system: 'light' as 'light' | 'dark',
}));

const mocks = vi.hoisted(() => ({
	writeStoredPreference: vi.fn(),
	applyThemeClass: vi.fn(),
}));

vi.mock('./colorMode', () => ({
	getSystemTheme: () => state.system,
	resolveTheme: (preference: 'light' | 'dark' | 'system') =>
		preference === 'system' ? state.system : preference,
	readStoredPreference: () => state.stored,
	writeStoredPreference: (preference: 'light' | 'dark' | 'system') => {
		state.stored = preference;
		mocks.writeStoredPreference(preference);
	},
	applyThemeClass: mocks.applyThemeClass,
}));

vi.mock('./runThemeTransition', () => ({
	runThemeTransition: vi.fn(
		async (
			_definition: unknown,
			_origin: unknown,
			_effectOptions: unknown,
			callback: () => void | Promise<void>,
			setAnimating: (value: boolean) => void,
		) => {
			setAnimating(true);
			await callback();
			setAnimating(false);
		},
	),
}));

import { createController, getController } from './controller';

beforeEach(() => {
	state.stored = 'light';
	state.system = 'light';
	vi.clearAllMocks();
});

describe('createController', () => {
	it('initializes theme from the stored preference', () => {
		state.stored = 'dark';
		const controller = createController();
		expect(controller.getState()).toEqual({ theme: 'dark', isAnimating: false });
	});

	it('toggleTheme flips light to dark and persists the resolved value', async () => {
		const controller = createController();
		await controller.toggleTheme();

		expect(controller.getState().theme).toBe('dark');
		expect(mocks.writeStoredPreference).toHaveBeenCalledWith('dark');
		expect(mocks.applyThemeClass).toHaveBeenCalledWith('dark');
	});

	it('toggleTheme flips dark back to light', async () => {
		state.stored = 'dark';
		const controller = createController();
		await controller.toggleTheme();

		expect(controller.getState().theme).toBe('light');
	});

	it('setTheme is a no-op while a transition is already animating', async () => {
		const controller = createController();
		const first = controller.toggleTheme();
		await controller.setTheme('dark');
		await first;

		expect(mocks.writeStoredPreference).toHaveBeenCalledTimes(1);
	});

	it('setTheme short-circuits when already on the requested non-system mode', async () => {
		const controller = createController();
		await controller.setTheme('light');

		expect(mocks.writeStoredPreference).not.toHaveBeenCalled();
	});

	it('setTheme("system") always proceeds even when already resolved to that value', async () => {
		const controller = createController();
		await controller.setTheme('system');

		expect(mocks.writeStoredPreference).toHaveBeenCalledWith('system');
	});

	it('isAnimating toggles true then false around a transition', async () => {
		const controller = createController();
		const seen: boolean[] = [];
		controller.subscribe(() => {
			seen.push(controller.getState().isAnimating);
		});

		await controller.toggleTheme();

		expect(seen).toContain(true);
		expect(seen[seen.length - 1]).toBe(false);
	});

	it('subscribe notifies on every state change and unsubscribe stops further notifications', async () => {
		const controller = createController();
		const listener = vi.fn();
		const unsubscribe = controller.subscribe(listener);

		await controller.toggleTheme();
		const callsAfterFirstToggle = listener.mock.calls.length;
		expect(callsAfterFirstToggle).toBeGreaterThan(0);

		unsubscribe();
		await controller.toggleTheme();

		expect(listener).toHaveBeenCalledTimes(callsAfterFirstToggle);
	});

	it('throws when a variant requiring an origin is used without one', async () => {
		const controller = createController({ variant: 'spread' });
		await expect(controller.toggleTheme()).rejects.toThrow('requires an origin point');
	});
});

describe('getController', () => {
	it('returns the same instance across calls', () => {
		expect(getController()).toBe(getController());
	});

	it('returns a different instance from createController', () => {
		expect(createController()).not.toBe(getController());
	});
});
