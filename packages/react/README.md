# @bruneckel/react-theme-transitions

[![npm version](https://img.shields.io/npm/v/@bruneckel/react-theme-transitions.svg)](https://www.npmjs.com/package/@bruneckel/react-theme-transitions)

React hook for animated dark/light theme transitions using the View Transitions API.

## Install

```
npm install @bruneckel/react-theme-transitions @bruneckel/theme-transitions-core
```

## Usage

```tsx
import { useThemeTransition } from '@bruneckel/react-theme-transitions';
import '@bruneckel/theme-transitions-core/style.css';

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

### Options

`useThemeTransition(options?)` accepts:

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `'spread' \| 'fade' \| 'none'` | `'fade'` | Which effect plays on toggle. `'none'` skips the animation entirely. |
| `duration` | `string` | `'400ms'` (fade) or `'1.5s'` (spread) | CSS animation duration. |
| `easing` | `string` | `'ease'` (fade) or `'cubic-bezier(0.4, 0, 0.2, 1)'` (spread) | CSS animation easing. |
| `radius` | `string` | `'150vmax'` | Final `clip-path` radius, `spread` only. |

`toggleTheme` and `setTheme(mode, ...)` both accept either a `MouseEvent` (as shown above) or an explicit `{ origin, variant, duration, easing, radius }` object, overriding the hook's own options for that one call only. `setTheme('dark', event)` works the same way `toggleTheme(event)` does.

Register the anti-flash init script via the Vite plugin, in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { themeTransitions } from '@bruneckel/theme-transitions-core/vite';

export default defineConfig({
	plugins: [react(), themeTransitions()],
});
```

## Notes

- `useThemeTransition(options)` wraps the core's shared `getController` singleton, so `options` only takes effect on the very first call in a process. See [`@bruneckel/theme-transitions-core`](https://www.npmjs.com/package/@bruneckel/theme-transitions-core)'s README for the full contract.
- Built on `useSyncExternalStore`, React's built-in primitive for subscribing to state outside its own render tree. Safe under `StrictMode`'s development-mode double-invocation.
- This package has no SSR-specific handling. It targets plain client-side React apps.

## Known issues

- The `spread` effect can render from the wrong position on Chrome 150 after moving the browser window between displays with different DPI. This is a known upstream Chrome bug, already fixed and pending release to the Stable channel. See [`@bruneckel/theme-transitions-core`](https://www.npmjs.com/package/@bruneckel/theme-transitions-core)'s README for details.
