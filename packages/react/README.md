# @brustack/react-theme-transitions

[![npm version](https://img.shields.io/npm/v/@brustack/react-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/react-theme-transitions)
[![license](https://img.shields.io/npm/l/@brustack/react-theme-transitions.svg)](https://github.com/brustack/theme-transitions/blob/main/packages/react/LICENSE)

React hook for animated dark/light theme transitions using the View Transitions API.

[Live demo](https://theme-transitions.brustack.dev)

![Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor](../../.github/assets/demo.gif)

## Install

```sh
npm install @brustack/react-theme-transitions @brustack/theme-transitions-core
# or
pnpm add @brustack/react-theme-transitions @brustack/theme-transitions-core
# or
yarn add @brustack/react-theme-transitions @brustack/theme-transitions-core
```

> [!IMPORTANT]
> Using Tailwind? Set `darkMode: 'class'` in your Tailwind config. Tailwind's default (`'media'`) ignores the `dark`/`light` class this package applies to `<html>`, so the toggle will silently have no visual effect without it.

## Usage

```tsx
import { useThemeTransition } from '@brustack/react-theme-transitions';
import '@brustack/theme-transitions-core/style.css';

export const ThemeToggle = () => {
	const { theme, isAnimating, toggleTheme } = useThemeTransition({ variant: 'spread' });

	return (
		<button disabled={isAnimating} onClick={toggleTheme}>
			{theme}
		</button>
	);
};
```

Binding `toggleTheme` directly to `onClick` works because it accepts React's `MouseEvent` and derives the spread effect's origin from the click position automatically. No import from the core package needed.

## Options

```ts
useThemeTransition(options?: {
	variant?: 'spread' | 'fade' | 'none'; // default 'fade'
	duration?: string;                    // default '400ms' (fade) or '1.5s' (spread)
	easing?: string;                      // fade only, any CSS easing function, default 'ease'
})
```

`'none'` skips the animation and ignores `duration`/`easing`. `spread` only accepts `duration`; its easing and clip-path radius are fixed and not configurable.

`toggleTheme` and `setTheme(mode, ...)` accept a `MouseEvent` (as shown above) or an explicit options object, e.g. `{ origin, variant, duration }`. This overrides the hook's own options for that one call only. `setTheme('dark', event)` works the same way as `toggleTheme(event)`.

`options` passed to `useThemeTransition` only takes effect on the hook's first call in the app, since it wraps a shared singleton. Per-call overrides on `toggleTheme`/`setTheme` are not affected by this and always apply. See [`@brustack/theme-transitions-core`](https://www.npmjs.com/package/@brustack/theme-transitions-core)'s README for the full singleton contract.

## Vite plugin

Register the anti-flash init script in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { themeTransitions } from '@brustack/theme-transitions-core/vite';

export default defineConfig({
	plugins: [react(), themeTransitions()],
});
```

Optionally, pass the same options as above so every `useThemeTransition()` call in the app picks them up without repeating them:

```ts
plugins: [react(), themeTransitions({ variant: 'spread', duration: '1.5s' })],
```

This only sets defaults. An explicit `useThemeTransition(options)` call, or a per-call override on `toggleTheme`/`setTheme`, still takes precedence.

Not using Vite? See [`@brustack/theme-transitions-core`](https://www.npmjs.com/package/@brustack/theme-transitions-core)'s README for how to wire up the anti-flash script and stylesheet with webpack or another bundler.

## Notes

- Built on `useSyncExternalStore`, React's built-in primitive for subscribing to state outside its own render tree. Safe under `StrictMode`'s development-mode double-invocation.
- This package has no SSR-specific handling. It targets plain client-side React apps.

## Known issues

- The `spread` effect can render from the wrong position on Chrome 150 after moving the browser window between displays with different DPI. This is a known upstream Chrome bug, already fixed and pending release to the Stable channel. See [`@brustack/theme-transitions-core`](https://www.npmjs.com/package/@brustack/theme-transitions-core)'s README for details.
