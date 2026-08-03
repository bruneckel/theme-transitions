export type {
	EffectDefinition,
	FadeEffectOptions,
	SpreadEffectOptions,
	ThemeEffect,
	ThemeMode,
	ThemeOrigin,
	ThemeTransitionEffects,
	ThemeTransitionModuleOptions,
	ThemeTransitionOptions,
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
	defaultThemeTransitionEffects,
	getEffectOrThrow,
	resolveThemeTransitionEffects,
	themeEffects,
} from './effects';

export { runThemeTransition } from './runThemeTransition';

export { createController, getController } from './controller';
export type { ThemeTransitionController, ThemeTransitionState } from './controller';
