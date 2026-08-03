# @bruneckel/theme-transitions-core

[![npm version](https://img.shields.io/npm/v/@bruneckel/theme-transitions-core.svg)](https://www.npmjs.com/package/@bruneckel/theme-transitions-core)

Framework-agnostic core for animated dark/light theme transitions using the View Transitions API.

## Install

```
npm install @bruneckel/theme-transitions-core
```

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

## Notes

- `getController(options)` only applies `options` on the very first call in a process. Subsequent calls with different options are ignored, since it returns the same shared singleton. Call `createController(options)` instead if you need an independently configured instance.
- This package exposes no framework bindings (no Vue/React). Pair it with a framework adapter package.
- Theme automatically stays in sync with OS-level `prefers-color-scheme` changes while the active preference is `'system'`. No extra code is needed.
- Server-side code (SSR) must use `createController()` for a request-scoped instance. `getController()`'s shared singleton is safe only for client-side usage, where one browser tab is already its own isolated process. A Node server handles many requests in the same process, so sharing the singleton there risks one user's theme leaking into another's response.
