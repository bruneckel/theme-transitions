import { describe, expect, it } from 'vitest';
import { defaultNoneOptions, noneEffect } from './none';

describe('noneEffect', () => {
	it('does not require an origin', () => {
		expect(noneEffect.requiresOrigin).toBe(false);
	});

	it('builds no CSS', () => {
		expect(noneEffect.buildCss(defaultNoneOptions)).toBe('');
	});

	it('has no skip delay', () => {
		expect(noneEffect.getSkipAfterMs(defaultNoneOptions, null)).toBe(0);
	});
});
