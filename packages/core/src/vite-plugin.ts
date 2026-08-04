import type { Plugin } from 'vite';
import { buildColorModeInitScript } from './colorMode';

export const themeTransitions = (): Plugin => ({
	name: 'theme-transitions',
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
