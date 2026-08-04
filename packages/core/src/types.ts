export type ThemeEffect = 'spread' | 'fade' | 'none';

export type ThemeOrigin = {
	x: number;
	y: number;
};

export type ThemeMode = 'light' | 'dark' | 'system';

export interface TransitionOptions {
	origin?: ThemeOrigin | null;
	variant?: ThemeEffect;
	duration?: string;
	easing?: string;
	radius?: string;
}

export interface SpreadEffectOptions {
	duration: string;
	easing: string;
	radius: string;
}

export interface FadeEffectOptions {
	duration: string;
	easing: string;
}

export type NoneEffectOptions = Record<string, never>;

export type EffectOptions = SpreadEffectOptions | FadeEffectOptions | NoneEffectOptions;

export interface ThemeEffects {
	spread: SpreadEffectOptions;
	fade: FadeEffectOptions;
	none: NoneEffectOptions;
}

export interface EffectDefinition {
	name: ThemeEffect;
	requiresOrigin: boolean;
	buildCss: (options: EffectOptions) => string;
	getSkipAfterMs: (options: EffectOptions, origin: ThemeOrigin | null) => number;
}

export type ThemeOptions = {
	variant?: ThemeEffect;
	duration?: string;
	easing?: string;
	radius?: string;
};
