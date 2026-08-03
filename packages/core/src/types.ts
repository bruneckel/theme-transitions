export type ThemeEffect = 'spread' | 'fade';

export type ThemeOrigin = {
	x: number;
	y: number;
};

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeTransitionOptions {
	origin?: ThemeOrigin | null;
	variant?: ThemeEffect;
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

export interface ThemeTransitionEffects {
	spread: SpreadEffectOptions;
	fade: FadeEffectOptions;
}

export interface EffectDefinition {
	name: ThemeEffect;
	requiresOrigin: boolean;
	buildCss: (options: SpreadEffectOptions | FadeEffectOptions) => string;
	getSkipAfterMs: (
		options: SpreadEffectOptions | FadeEffectOptions,
		origin: ThemeOrigin | null,
	) => number;
}

export type ThemeTransitionModuleOptions = {
	variant?: ThemeEffect;
	duration?: string;
	easing?: string;
	radius?: string;
};
