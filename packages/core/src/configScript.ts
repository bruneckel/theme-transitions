import type { ThemeOptions } from './types';

export const buildConfigInitScript = (options: ThemeOptions): string =>
	`window.__themeConfig = ${JSON.stringify(options)};`;
