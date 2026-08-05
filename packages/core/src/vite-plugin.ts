import type { Plugin } from 'vite';
import { buildColorModeInitScript } from './colorMode';
import { buildConfigInitScript } from './configScript';
import type { ThemeOptions } from './types';

export const themeTransitions = (options?: ThemeOptions): Plugin => ({
	name: 'theme-transitions',
	transformIndexHtml() {
		const children = options
			? `${buildConfigInitScript(options)}\n${buildColorModeInitScript()}`
			: buildColorModeInitScript();

		return [
			{
				tag: 'script',
				children,
				injectTo: 'head-prepend',
			},
		];
	},
});
