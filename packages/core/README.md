# @bruneckel/theme-transitions-core

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
