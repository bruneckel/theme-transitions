import { describe, expect, it } from 'vitest';
import { buildColorModeInitScript } from '@bruneckel/theme-transitions-core';
import { themeTransitions } from './vite-plugin';

describe('themeTransitions', () => {
	it('has the expected plugin name', () => {
		expect(themeTransitions().name).toBe('vue-theme-transitions');
	});

	it('injects the anti-flash init script as a head-prepend tag', () => {
		const plugin = themeTransitions();
		const transform = plugin.transformIndexHtml as () => unknown;

		expect(transform()).toEqual([
			{
				tag: 'script',
				children: buildColorModeInitScript(),
				injectTo: 'head-prepend',
			},
		]);
	});
});
