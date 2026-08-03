import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

const controllerMock = vi.hoisted(() => {
	const listeners = new Set<() => void>();
	let state: { theme: 'light' | 'dark'; isAnimating: boolean } = {
		theme: 'light',
		isAnimating: false,
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

vi.mock('@bruneckel/theme-transitions-core', () => ({
	getController: getControllerMock,
}));

import { useThemeTransition } from './useThemeTransition';

const withSetup = <T>(setupFn: () => T) => {
	let result!: T;
	const wrapper = mount(
		defineComponent({
			setup() {
				result = setupFn();
				return () => h('div');
			},
		}),
	);
	return { result, wrapper };
};

beforeEach(() => {
	controllerMock.clearListeners();
	controllerMock.setState({ theme: 'light', isAnimating: false });
	vi.clearAllMocks();
});

describe('useThemeTransition', () => {
	it('reflects the controller\'s current state on setup', () => {
		controllerMock.setState({ theme: 'dark', isAnimating: true });
		const { result } = withSetup(() => useThemeTransition());

		expect(result.theme.value).toBe('dark');
		expect(result.isAnimating.value).toBe(true);
	});

	it('updates reactively when the controller notifies a state change', () => {
		const { result } = withSetup(() => useThemeTransition());

		controllerMock.setState({ theme: 'dark' });

		expect(result.theme.value).toBe('dark');
	});

	it('unsubscribes from the controller when the component unmounts', () => {
		const { wrapper } = withSetup(() => useThemeTransition());

		expect(controllerMock.listenerCount()).toBe(1);
		wrapper.unmount();

		expect(controllerMock.listenerCount()).toBe(0);
	});

	it('delegates toggleTheme to the controller with the same arguments', async () => {
		const { result } = withSetup(() => useThemeTransition());
		const options = { origin: { x: 1, y: 2 } };

		await result.toggleTheme(options);

		expect(controllerMock.toggleTheme).toHaveBeenCalledWith(options);
	});

	it('delegates setTheme to the controller with the same arguments', async () => {
		const { result } = withSetup(() => useThemeTransition());
		const options = { variant: 'fade' as const };

		await result.setTheme('dark', options);

		expect(controllerMock.setTheme).toHaveBeenCalledWith('dark', options);
	});

	it('passes options through to getController', () => {
		const options = { variant: 'spread' as const };
		withSetup(() => useThemeTransition(options));

		expect(getControllerMock).toHaveBeenCalledWith(options);
	});
});
