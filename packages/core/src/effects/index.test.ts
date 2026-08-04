import { describe, expect, it } from 'vitest';
import {
	buildThemeTransitionCss,
	defaultThemeEffects,
	getEffectOrThrow,
	resolveThemeEffects,
} from './index';

describe('getEffectOrThrow', () => {
	it('returns the matching effect definition', () => {
		expect(getEffectOrThrow('fade').name).toBe('fade');
		expect(getEffectOrThrow('spread').name).toBe('spread');
		expect(getEffectOrThrow('none').name).toBe('none');
	});

	it('throws for an unknown variant', () => {
		expect(() => getEffectOrThrow('unknown' as never)).toThrow('Unknown theme transition variant: unknown');
	});
});

describe('resolveThemeEffects', () => {
	it('returns the defaults when no options are given', () => {
		expect(resolveThemeEffects()).toEqual(defaultThemeEffects);
	});

	it('merges duration/easing overrides for the selected fade variant', () => {
		const result = resolveThemeEffects({ variant: 'fade', duration: '2s', easing: 'linear' });
		expect(result.fade).toEqual({ duration: '2s', easing: 'linear' });
		expect(result.spread).toEqual(defaultThemeEffects.spread);
	});

	it('merges duration/easing/radius overrides for the selected spread variant', () => {
		const result = resolveThemeEffects({ variant: 'spread', duration: '2s', easing: 'linear', radius: '100vmax' });
		expect(result.spread).toEqual({ duration: '2s', easing: 'linear', radius: '100vmax' });
		expect(result.fade).toEqual(defaultThemeEffects.fade);
	});

	it('ignores overrides for the variant that is not selected', () => {
		const result = resolveThemeEffects({ variant: 'fade', radius: '999vmax' });
		expect(result.spread).toEqual(defaultThemeEffects.spread);
	});

	it('returns the none effect options unchanged regardless of the selected variant', () => {
		expect(resolveThemeEffects({ variant: 'none' }).none).toEqual(defaultThemeEffects.none);
	});
});

describe('buildThemeTransitionCss', () => {
	it('includes CSS for both effects and the reduced-motion override', () => {
		const css = buildThemeTransitionCss();
		expect(css).toContain('theme-fade-in');
		expect(css).toContain('theme-spread-reveal');
		expect(css).toContain('prefers-reduced-motion: reduce');
	});
});
