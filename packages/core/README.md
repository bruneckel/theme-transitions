# @bruneckel/theme-transitions-core

[![npm version](https://img.shields.io/npm/v/@bruneckel/theme-transitions-core.svg)](https://www.npmjs.com/package/@bruneckel/theme-transitions-core)
[![license](https://img.shields.io/npm/l/@bruneckel/theme-transitions-core.svg)](https://github.com/bruneckel/theme-transitions/blob/main/packages/core/LICENSE)

Framework-agnostic core for animated dark/light theme transitions using the View Transitions API.

## Install

```sh
npm install @bruneckel/theme-transitions-core
# or
pnpm add @bruneckel/theme-transitions-core
# or
yarn add @bruneckel/theme-transitions-core
```

> [!IMPORTANT]
> Using Tailwind? Set `darkMode: 'class'` in your Tailwind config. Tailwind's default (`'media'`) ignores the `dark`/`light` class this package applies to `<html>`, so the toggle will silently have no visual effect without it.

## Usage

```ts
import { getController } from '@bruneckel/theme-transitions-core';

const controller = getController();

await controller.toggleTheme();

const { theme, isAnimating } = controller.getState();

const unsubscribe = controller.subscribe(() => {
	console.log(controller.getState());
});
```

## Vite plugin

Register the anti-flash init script in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import { themeTransitions } from '@bruneckel/theme-transitions-core/vite';

export default defineConfig({
	plugins: [themeTransitions()],
});
```

Optionally, pass default effect options so every `useThemeTransition()` call in the app picks them up without repeating them:

```ts
plugins: [themeTransitions({ variant: 'spread', duration: '1.5s' })],
```

This only sets defaults; an explicit `useThemeTransition(options)` call, or a per-call `toggleTheme(options)`/`setTheme(mode, options)` override, still takes precedence.

## Stylesheet

Import the static default stylesheet once, wherever your app initializes:

```ts
import '@bruneckel/theme-transitions-core/style.css';
```

## Notes

- `getController(options)` only applies `options` on the very first call in a process. Subsequent calls with different options are ignored, since it returns the same shared singleton. Call `createController(options)` instead if you need an independently configured instance.
- This package exposes no framework bindings (no Vue/React). Pair it with a framework adapter package.
- Theme automatically stays in sync with OS-level `prefers-color-scheme` changes while the active preference is `'system'`. No extra code is needed.
- Server-side code (SSR) must use `createController()` for a request-scoped instance. `getController()`'s shared singleton is safe only for client-side usage, where one browser tab is already its own isolated process. A Node server handles many requests in the same process, so sharing the singleton there risks one user's theme leaking into another's response.

## Known issues

- Chrome 150 has a regression where the `spread` effect's clip-path animation can render from the wrong position after the browser window moves between displays with different DPI/scaling. This is a Chrome bug, not something this package can work around. It's already fixed upstream and verified in Chrome Canary; the fix should reach the Stable channel in a future release. See [Chromium issue #535696703](https://issues.chromium.org/issues/535696703).
