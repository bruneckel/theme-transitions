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

| Option | Type | Default |
| --- | --- | --- |
| `variant` | `'spread' \| 'fade' \| 'none'` | `'fade'` |

`variant` picks which effect plays on toggle; `'none'` skips the animation entirely and ignores every option below. The rest of the options depend on which variant is active:

**`fade`**

| Option | Type | Default |
| --- | --- | --- |
| `duration` | `string` | `'400ms'` |
| `easing` | `string` | `'ease'` |

**`spread`**

| Option | Type | Default |
| --- | --- | --- |
| `duration` | `string` | `'1.5s'` |
| `easing` | `string` | `'cubic-bezier(0.4, 0, 0.2, 1)'` |
| `radius` | `string` | `'150vmax'`, the final `clip-path` radius |

`toggleTheme` and `setTheme(mode, ...)` both accept either a `MouseEvent` (as shown above) or an explicit options object (`{ origin, variant, duration, easing, radius }`), overriding the hook's own options for that one call only. `setTheme('dark', event)` works the same way `toggleTheme(event)` does.

`useThemeTransition(options)` wraps the core's shared `getController` singleton, so `options` only takes effect on the very first call in a process; per-call overrides on `toggleTheme`/`setTheme` always apply regardless. See [`@bruneckel/theme-transitions-core`](https://www.npmjs.com/package/@bruneckel/theme-transitions-core)'s README for the full singleton contract.

Register the anti-flash init script via the Vite plugin, in `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { themeTransitions } from '@bruneckel/theme-transitions-core/vite';

export default defineConfig({
	plugins: [react(), themeTransitions()],
});
```

Optionally, pass the same options from the table above so every `useThemeTransition()` call in the app picks them up without repeating them:

```ts
plugins: [react(), themeTransitions({ variant: 'spread', duration: '1.5s' })],
```

This only sets defaults; an explicit `useThemeTransition(options)` call, or a per-call `toggleTheme(options)`/`setTheme(mode, options)` override, still takes precedence.

## Notes

- Built on `useSyncExternalStore`, React's built-in primitive for subscribing to state outside its own render tree. Safe under `StrictMode`'s development-mode double-invocation.
- This package has no SSR-specific handling. It targets plain client-side React apps.

## Known issues

- The `spread` effect can render from the wrong position on Chrome 150 after moving the browser window between displays with different DPI. This is a known upstream Chrome bug, already fixed and pending release to the Stable channel. See [`@bruneckel/theme-transitions-core`](https://www.npmjs.com/package/@bruneckel/theme-transitions-core)'s README for details.
