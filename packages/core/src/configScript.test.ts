import { describe, expect, it } from 'vitest';
import { buildConfigInitScript } from './configScript';

describe('buildConfigInitScript', () => {
	it('serializes the given options as a window assignment', () => {
		expect(buildConfigInitScript({ variant: 'spread', duration: '1s' })).toBe(
			'window.__themeConfig = {"variant":"spread","duration":"1s"};',
		);
	});

	it('serializes an empty object when no options are set', () => {
		expect(buildConfigInitScript({})).toBe('window.__themeConfig = {};');
	});
});
