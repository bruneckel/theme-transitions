# @bruneckel/vue-theme-transitions

Vue 3 composable and Vite plugin for animated dark/light theme transitions using the View Transitions API.

## Install

```
npm install @bruneckel/vue-theme-transitions
```

## Usage

```ts
import { useThemeTransition } from '@bruneckel/vue-theme-transitions';
import '@bruneckel/vue-theme-transitions/style.css';

const { theme, isAnimating, toggleTheme } = useThemeTransition();

await toggleTheme();
```

Register the anti-flash init script via the Vite plugin, in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { themeTransitions } from '@bruneckel/vue-theme-transitions/vite';

export default defineConfig({
	plugins: [themeTransitions()],
});
```

## Notes

- The shipped stylesheet always reflects the core's default fade/spread timings (400ms fade, 1s/150vmax spread). If you configure `useThemeTransition` with a custom `duration`, `easing`, or `radius`, the JS-side skip timing will no longer match the CSS animation's actual duration.
- `useThemeTransition(options)` wraps the core's shared `getController` singleton, so `options` only takes effect on the very first call in a process. See `@bruneckel/theme-transitions-core`'s README for the full contract.
- This package has no SSR-specific handling. It targets plain client-side Vue 3 apps.
