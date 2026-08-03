# @bruneckel/vue-theme-transitions

[![npm version](https://img.shields.io/npm/v/@bruneckel/vue-theme-transitions.svg)](https://www.npmjs.com/package/@bruneckel/vue-theme-transitions)

Vue 3 composable and Vite plugin for animated dark/light theme transitions using the View Transitions API.

## Install

```
npm install @bruneckel/vue-theme-transitions
```

## Usage

```vue
<script setup lang="ts">
import { useThemeTransition } from '@bruneckel/vue-theme-transitions';
import '@bruneckel/vue-theme-transitions/style.css';

const { theme, isAnimating, toggleTheme } = useThemeTransition({ variant: 'spread' });
</script>

<template>
	<button :disabled="isAnimating" @click="toggleTheme">
		{{ theme }}
	</button>
</template>
```

Binding `toggleTheme` directly to `@click` works because it accepts the native `MouseEvent` and derives the spread effect's origin from the click position automatically. No import from the core package needed.

### Options

`useThemeTransition(options?)` accepts:

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `'spread' \| 'fade'` | `'fade'` | Which effect plays on toggle. |
| `duration` | `string` | `'400ms'` (fade) or `'1s'` (spread) | CSS animation duration. See the stylesheet limitation below. |
| `easing` | `string` | `'ease'` (fade) or `'cubic-bezier(0.4, 0, 0.2, 1)'` (spread) | CSS animation easing. Same limitation as `duration`. |
| `radius` | `string` | `'150vmax'` | Final `clip-path` radius, `spread` only. Same limitation as `duration`. |

`toggleTheme` and `setTheme(mode, ...)` both accept either a `MouseEvent` (as shown above) or an explicit `{ origin, variant }` object, overriding the composable's own options for that one call only. `setTheme('dark', event)` works the same way `toggleTheme(event)` does.

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
