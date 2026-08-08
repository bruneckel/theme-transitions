import { beforeEach, describe, expect, it, vi } from 'vitest';

const controllerMock = vi.hoisted(() => {
	const listeners = new Set<() => void>();
	let state: { theme: string; mode: string; isAnimating: boolean; themes: string[] } = {
		theme: 'light',
		mode: 'light',
		isAnimating: false,
		themes: ['light', 'dark', 'system'],
	};

	return {
		getState: () => state,
		setState: (next: Partial<typeof state>) => {
			state = { ...state, ...next };
			for (const listener of listeners) {
				listener();
			}
		},
		subscribe: (listener: () => void) => {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},
		listenerCount: () => listeners.size,
		clearListeners: () => listeners.clear(),
		toggleTheme: vi.fn(async () => {}),
		setTheme: vi.fn(async () => {}),
	};
});

const getControllerMock = vi.hoisted(() => vi.fn(() => controllerMock));

vi.mock('@brustack/theme-transitions-core', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@brustack/theme-transitions-core')>();

	return {
		...actual,
		getController: getControllerMock,
	};
});

import themeTransition from './index';

// themeTransition(Alpine) calls Alpine.data('themeTransition', factory).
// Capture that factory via a fake Alpine object instead of using the real library.
const registerAndBuild = (options?: object) => {
	let factory: ((opts?: object) => Record<string, unknown>) | undefined;
	const fakeAlpine = {
		data: (_name: string, f: typeof factory) => {
			factory = f;
		},
	};

	themeTransition(fakeAlpine as never);

	return factory!(options) as {
		theme: string;
		mode: string;
		isAnimating: boolean;
		themes: string[];
		init: () => void;
		destroy: () => void;
		toggleTheme: (eventOrOptions?: unknown) => void;
		setTheme: (mode: string, eventOrOptions?: unknown) => void;
	};
};

beforeEach(() => {
	controllerMock.clearListeners();
	controllerMock.setState({ theme: 'light', mode: 'light', isAnimating: false, themes: ['light', 'dark', 'system'] });
	vi.clearAllMocks();
});

describe('themeTransition', () => {
	it('reflects the controller\'s current state after init()', () => {
		controllerMock.setState({ theme: 'dark', mode: 'dark', isAnimating: true });
		const data = registerAndBuild();
		data.init();

		expect(data.theme).toBe('dark');
		expect(data.mode).toBe('dark');
		expect(data.isAnimating).toBe(true);
	});

	it('updates reactively when the controller notifies a state change', () => {
		const data = registerAndBuild();
		data.init();

		controllerMock.setState({ theme: 'dark' });

		expect(data.theme).toBe('dark');
	});

	it('unsubscribes from the controller on destroy()', () => {
		const data = registerAndBuild();
		data.init();

		expect(controllerMock.listenerCount()).toBe(1);
		data.destroy();

		expect(controllerMock.listenerCount()).toBe(0);
	});

	it('passes x-data options through to getController', () => {
		const data = registerAndBuild({ variant: 'spread', themes: ['sepia'] });
		data.init();

		expect(getControllerMock).toHaveBeenCalledWith({ variant: 'spread', themes: ['sepia'] });
	});

	it('delegates toggleTheme to the controller', () => {
		const data = registerAndBuild();
		data.init();
		data.toggleTheme();

		expect(controllerMock.toggleTheme).toHaveBeenCalled();
	});

	it('delegates setTheme to the controller with the given mode', () => {
		const data = registerAndBuild();
		data.init();
		data.setTheme('sepia');

		expect(controllerMock.setTheme).toHaveBeenCalledWith('sepia', expect.anything());
	});
});
