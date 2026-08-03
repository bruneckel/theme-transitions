import { describe, expect, it } from 'vitest';
import { defaultFadeOptions, fadeEffect } from './fade';

describe('fadeEffect', () => {
	it('does not require an origin', () => {
		expect(fadeEffect.requiresOrigin).toBe(false);
	});

	it('builds CSS containing the configured duration and easing', () => {
		const css = fadeEffect.buildCss(defaultFadeOptions);
		expect(css).toContain(defaultFadeOptions.duration);
		expect(css).toContain(defaultFadeOptions.easing);
		expect(css).toContain('theme-fade-in');
		expect(css).toContain('theme-fade-out');
	});

	it('estimates the skip time from the configured duration', () => {
		expect(fadeEffect.getSkipAfterMs(defaultFadeOptions, null)).toBe(400);
	});
});
