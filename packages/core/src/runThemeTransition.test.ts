import { afterEach, describe, expect, it, vi } from 'vitest';
import { runThemeTransition } from './runThemeTransition';
import type { EffectDefinition } from './types';

const createDefinition = (
	getSkipAfterMs: EffectDefinition['getSkipAfterMs'] = () => 1000,
): EffectDefinition => ({
	name: 'fade',
	requiresOrigin: false,
	buildCss: () => '',
	getSkipAfterMs,
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

describe('runThemeTransition', () => {
	it('runs the callback directly when document is unavailable', async () => {
		vi.stubGlobal('document', undefined);
		const callback = vi.fn();
		const setAnimating = vi.fn();

		await runThemeTransition(
			createDefinition(),
			null,
			{ duration: '1s', easing: 'linear' } as never,
			callback,
			setAnimating,
		);

		expect(callback).toHaveBeenCalledTimes(1);
		expect(setAnimating).not.toHaveBeenCalled();
	});

	it('runs the callback directly when reduced motion is preferred, without a view transition', async () => {
		const root = { dataset: {} as { themeEffect?: string }, style: { setProperty: vi.fn(), removeProperty: vi.fn() } };
		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition: vi.fn(),
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: true }),
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();

		await runThemeTransition(
			createDefinition(),
			null,
			{ duration: '1s', easing: 'linear' } as never,
			callback,
			setAnimating,
		);

		expect(callback).toHaveBeenCalledTimes(1);
		expect(setAnimating).toHaveBeenNthCalledWith(1, true);
		expect(setAnimating).toHaveBeenNthCalledWith(2, false);
	});

	it('runs a view transition, sets the origin custom properties, and skips after the estimated time', async () => {
		vi.useFakeTimers();

		const root = {
			dataset: {} as { themeEffect?: string },
			style: { setProperty: vi.fn(), removeProperty: vi.fn() },
		};

		let finishedResolve: () => void = () => {};
		const finished = new Promise<void>((resolve) => {
			finishedResolve = resolve;
		});
		const skipTransition = vi.fn(() => finishedResolve());
		const startViewTransition = vi.fn((update: () => Promise<void>) => {
			update();
			return { ready: Promise.resolve(), finished, skipTransition };
		});

		vi.stubGlobal('document', {
			documentElement: root,
			startViewTransition,
		});
		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false }),
		});

		const callback = vi.fn();
		const setAnimating = vi.fn();
		const definition = createDefinition(() => 500);

		const promise = runThemeTransition(
			definition,
			{ x: 10, y: 20 },
			{ duration: '1s', easing: 'linear' } as never,
			callback,
			setAnimating,
		);

		await vi.advanceTimersByTimeAsync(500);
		await promise;

		expect(root.dataset.themeEffect).toBeUndefined();
		expect(root.style.setProperty).toHaveBeenCalledWith('--theme-origin-x', '10px');
		expect(root.style.setProperty).toHaveBeenCalledWith('--theme-origin-y', '20px');
		expect(root.style.removeProperty).toHaveBeenCalledWith('--theme-origin-x');
		expect(root.style.removeProperty).toHaveBeenCalledWith('--theme-origin-y');
		expect(skipTransition).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledTimes(1);
	});
});
