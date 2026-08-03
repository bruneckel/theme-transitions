import type { SpreadEffectOptions, ThemeOrigin } from './types';

export const parseCssDuration = (duration: string): number => {
	const trimmed = duration.trim();

	if (trimmed.endsWith('ms')) {
		return parseFloat(trimmed);
	}

	if (trimmed.endsWith('s')) {
		return parseFloat(trimmed) * 1000;
	}

	return parseFloat(trimmed) || 0;
};

const SKIP_BUFFER_MS = 50;

export const estimateSpreadSkipMs = (
	origin: ThemeOrigin,
	options: SpreadEffectOptions,
): number => {
	const durationMs = parseCssDuration(options.duration);

	if (typeof window === 'undefined') {
		return durationMs;
	}

	const coverDistance = Math.hypot(
		Math.max(origin.x, window.innerWidth - origin.x),
		Math.max(origin.y, window.innerHeight - origin.y),
	);

	const match = options.radius.match(/^([\d.]+)vmax$/);
	const vmaxValue = Number.parseFloat(match?.[1] ?? '150');
	const vmaxPx
		= (Math.max(window.innerWidth, window.innerHeight) / 100) * vmaxValue;

	const ratio = Math.min(1, coverDistance / vmaxPx);

	return Math.round(durationMs * ratio + SKIP_BUFFER_MS);
};
