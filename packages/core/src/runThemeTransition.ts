import type {
	EffectDefinition,
	FadeEffectOptions,
	SpreadEffectOptions,
	ThemeOrigin,
} from './types';

export const runThemeTransition = async (
	definition: EffectDefinition,
	origin: ThemeOrigin | null,
	effectOptions: SpreadEffectOptions | FadeEffectOptions,
	callback: () => void | Promise<void>,
	setAnimating: (value: boolean) => void,
) => {
	if (typeof document === 'undefined') {
		await callback();
		return;
	}

	const root = document.documentElement;
	root.dataset.themeEffect = definition.name;

	if (origin) {
		root.style.setProperty('--theme-origin-x', `${origin.x}px`);
		root.style.setProperty('--theme-origin-y', `${origin.y}px`);
	}

	const cleanup = () => {
		delete root.dataset.themeEffect;
		root.style.removeProperty('--theme-origin-x');
		root.style.removeProperty('--theme-origin-y');
	};

	const prefersReducedMotion = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches;

	if (!document.startViewTransition || prefersReducedMotion) {
		setAnimating(true);

		try {
			await callback();
		}
		finally {
			setAnimating(false);
			cleanup();
		}

		return;
	}

	setAnimating(true);

	const transition = document.startViewTransition(async () => {
		await callback();
	});

	let skipTimer: ReturnType<typeof setTimeout> | undefined;

	try {
		await transition.ready;

		const skipAfterMs = definition.getSkipAfterMs(effectOptions, origin);
		skipTimer = setTimeout(() => {
			transition.skipTransition?.();
			setAnimating(false);
		}, skipAfterMs);

		await transition.finished;
	}
	finally {
		if (skipTimer) {
			clearTimeout(skipTimer);
		}

		setAnimating(false);
		cleanup();
	}
};
