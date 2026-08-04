import type {
	EffectDefinition,
	ThemeEffect,
	ThemeTransitionEffects,
	ThemeTransitionModuleOptions,
} from '../types';
import { defaultFadeOptions, fadeEffect } from './fade';
import { defaultNoneOptions, noneEffect } from './none';
import { defaultSpreadOptions, spreadEffect } from './spread';

export type {
	EffectDefinition,
	FadeEffectOptions,
	NoneEffectOptions,
	SpreadEffectOptions,
	ThemeEffect,
	ThemeTransitionEffects,
	ThemeTransitionModuleOptions,
} from '../types';

export const themeEffects: EffectDefinition[] = [spreadEffect, fadeEffect, noneEffect];

export const defaultThemeTransitionEffects: ThemeTransitionEffects = {
	spread: defaultSpreadOptions,
	fade: defaultFadeOptions,
	none: defaultNoneOptions,
};

export const getEffectOrThrow = (name: ThemeEffect): EffectDefinition => {
	const effect = themeEffects.find(entry => entry.name === name);

	if (!effect) {
		throw new Error(`Unknown theme transition variant: ${name}`);
	}

	return effect;
};

const pickOverrides = (
	options: ThemeTransitionModuleOptions | undefined,
	keys: ('duration' | 'easing' | 'radius')[],
): Record<string, string> => {
	const overrides: Record<string, string> = {};

	for (const key of keys) {
		const value = options?.[key];
		if (value) {
			overrides[key] = value;
		}
	}

	return overrides;
};

export const resolveThemeTransitionEffects = (
	options?: ThemeTransitionModuleOptions,
): ThemeTransitionEffects => {
	const variant = options?.variant ?? 'fade';

	return {
		spread: {
			...defaultSpreadOptions,
			...(variant === 'spread' ? pickOverrides(options, ['duration', 'easing', 'radius']) : {}),
		},
		fade: {
			...defaultFadeOptions,
			...(variant === 'fade' ? pickOverrides(options, ['duration', 'easing']) : {}),
		},
		none: defaultNoneOptions,
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
