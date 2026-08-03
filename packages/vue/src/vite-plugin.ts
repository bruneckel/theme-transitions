import type { Plugin } from 'vite';
import { buildColorModeInitScript } from '@bruneckel/theme-transitions-core';

export const themeTransitions = (): Plugin => ({
	name: 'vue-theme-transitions',
	transformIndexHtml() {
		return [
			{
				tag: 'script',
				children: buildColorModeInitScript(),
				injectTo: 'head-prepend',
			},
		];
	},
});
