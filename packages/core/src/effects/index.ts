import type {
	EffectDefinition,
	ThemeEffect,
	ThemeTransitionEffects,
	ThemeTransitionModuleOptions,
} from '../types';
import { defaultFadeOptions, fadeEffect } from './fade';
import { defaultSpreadOptions, spreadEffect } from './spread';

export type {
	EffectDefinition,
	FadeEffectOptions,
	SpreadEffectOptions,
	ThemeEffect,
	ThemeTransitionEffects,
	ThemeTransitionModuleOptions,
} from '../types';

export const themeEffects: EffectDefinition[] = [spreadEffect, fadeEffect];

export const defaultThemeTransitionEffects: ThemeTransitionEffects = {
	spread: defaultSpreadOptions,
	fade: defaultFadeOptions,
};

export const getEffectOrThrow = (name: ThemeEffect): EffectDefinition => {
	const effect = themeEffects.find(entry => entry.name === name);

	if (!effect) {
		throw new Error(`Unknown theme transition variant: ${name}`);
	}

	return effect;
};

export const resolveThemeTransitionEffects = (
	options?: ThemeTransitionModuleOptions,
): ThemeTransitionEffects => {
	const variant = options?.variant ?? 'fade';

	const spreadOverrides
		= variant === 'spread' && options
			? {
					...(options.duration ? { duration: options.duration } : {}),
					...(options.easing ? { easing: options.easing } : {}),
					...(options.radius ? { radius: options.radius } : {}),
				}
			: {};

	const fadeOverrides
		= variant === 'fade' && options
			? {
					...(options.duration ? { duration: options.duration } : {}),
					...(options.easing ? { easing: options.easing } : {}),
				}
			: {};

	return {
		spread: { ...defaultSpreadOptions, ...spreadOverrides },
		fade: { ...defaultFadeOptions, ...fadeOverrides },
	};
};

const vtLayer = (layer: 'old' | 'new') =>
	`html[data-theme-effect]::view-transition-${layer}(root)`;

export const buildThemeTransitionCss = (
	effects: ThemeTransitionEffects = defaultThemeTransitionEffects,
): string => {
	const effectCss = themeEffects
		.map(effect => effect.buildCss(effects[effect.name]))
		.join('\n');

	return `${effectCss}

html[data-theme-effect]::view-transition,
html[data-theme-effect]::view-transition-group(root),
html[data-theme-effect]::view-transition-image-pair(root),
html[data-theme-effect]::view-transition-old(root),
html[data-theme-effect]::view-transition-new(root) {
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  ${vtLayer('old')},
  ${vtLayer('new')} {
    animation: none;
  }
}`;
};
