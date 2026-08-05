# @bruneckel/vue-theme-transitions

[![npm version](https://img.shields.io/npm/v/@bruneckel/vue-theme-transitions.svg)](https://www.npmjs.com/package/@bruneckel/vue-theme-transitions)

Vue 3 composable for animated dark/light theme transitions using the View Transitions API.

## Install

```
npm install @bruneckel/vue-theme-transitions @bruneckel/theme-transitions-core
```

## Usage

```vue
<script setup lang="ts">
import { useThemeTransition } from '@bruneckel/vue-theme-transitions';
import '@bruneckel/theme-transitions-core/style.css';

const { theme, isAnimating, toggleTheme } = useThemeTransition({ variant: 'spread' });
</script>

<template>
	<button :disabled="isAnimating" @click="toggleTheme">
		{{ theme }}
	</button>
</template>
```

Binding `toggleTheme` directly to `@click` works because it accepts the native `MouseEvent` and derives the spread effect's origin from the click position automatically. No import from the core package needed.

## Options

`useThemeTransition(options?)` accepts:

| Option | Type | Default |
| --- | --- | --- |
| `variant` | `'spread' \| 'fade' \| 'none'` | `'fade'` |

`variant` picks which effect plays on toggle. `'none'` skips the animation and ignores every option below.

- **`fade`** accepts `duration` (`string`, default `'400ms'`) and `easing` (`string`, default `'ease'`).
- **`spread`** accepts `duration` only (`string`, default `'1.5s'`). Its easing and clip-path radius are fixed.

`toggleTheme` and `setTheme(mode, ...)` accept a `MouseEvent` (as shown above) or an explicit options object, e.g. `{ origin, variant, duration }`. This overrides the composable's own options for that one call only. `setTheme('dark', event)` works the same way as `toggleTheme(event)`.

`options` passed to `useThemeTransition` only takes effect on the composable's first call in the app, since it wraps a shared singleton. Per-call overrides on `toggleTheme`/`setTheme` are not affected by this and always apply. See [`@bruneckel/theme-transitions-core`](https://www.npmjs.com/package/@bruneckel/theme-transitions-core)'s README for the full singleton contract.

## Vite plugin

Register the anti-flash init script in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { themeTransitions } from '@bruneckel/theme-transitions-core/vite';

export default defineConfig({
	plugins: [themeTransitions()],
});
```

Optionally, pass the same options as above so every `useThemeTransition()` call in the app picks them up without repeating them:

```ts
plugins: [themeTransitions({ variant: 'spread', duration: '1.5s' })],
```

This only sets defaults. An explicit `useThemeTransition(options)` call, or a per-call override on `toggleTheme`/`setTheme`, still takes precedence.

## Notes

- This package has no SSR-specific handling. It targets plain client-side Vue 3 apps.

## Known issues

- The `spread` effect can render from the wrong position on Chrome 150 after moving the browser window between displays with different DPI. This is a known upstream Chrome bug, already fixed and pending release to the Stable channel. See [`@bruneckel/theme-transitions-core`](https://www.npmjs.com/package/@bruneckel/theme-transitions-core)'s README for details.
