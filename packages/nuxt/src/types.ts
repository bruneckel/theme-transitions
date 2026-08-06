import type { ThemeOptions } from '@bruneckel/theme-transitions-core';

export type ThemeTransitionModuleOptions = ThemeOptions;

type ThemeTransitionConfig = ThemeTransitionModuleOptions | false;

declare module '@nuxt/schema' {
	interface NuxtConfig {
		themeTransition?: ThemeTransitionConfig;
	}

	interface PublicRuntimeConfig {
		themeTransition: ThemeTransitionModuleOptions;
	}
}

declare module 'nuxt/schema' {
	interface NuxtConfig {
		themeTransition?: ThemeTransitionConfig;
	}

	interface PublicRuntimeConfig {
		themeTransition: ThemeTransitionModuleOptions;
	}
}

export {};
