export type {
	EffectDefinition,
	FadeEffectOptions,
	SpreadEffectOptions,
	ThemeEffect,
	ThemeEffects,
	ThemeMode,
	ThemeOptions,
	ThemeOrigin,
	TransitionOptions,
} from './types';

export {
	applyThemeClass,
	buildColorModeInitScript,
	getSystemTheme,
	readStoredPreference,
	resolveTheme,
	writeStoredPreference,
} from './colorMode';

export { originFromElement, originFromEvent } from './origin';

export { estimateSpreadSkipMs, parseCssDuration } from './time';

export {
	buildThemeTransitionCss,
	defaultThemeEffects,
	getEffectOrThrow,
	resolveThemeEffects,
	themeEffects,
} from './effects';

export { runThemeTransition } from './runThemeTransition';

export { createController, getController } from './controller';
export type { ThemeController, ThemeState } from './controller';
