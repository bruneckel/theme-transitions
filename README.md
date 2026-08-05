# theme-transitions

Animated dark/light theme transitions for the web, powered by the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

A framework-agnostic core with a thin adapter per framework. Vue and React are available today; Next.js is next.

## Features

- Spread and fade transition effects, triggered from any click origin
- Automatic theme persistence and system-preference detection
- No flash of the wrong theme on page load
- Zero dependencies in the core; each adapter only depends on its own framework

## Packages

| Package | npm | Description |
| --- | --- | --- |
| [`@bruneckel/theme-transitions-core`](packages/core) | [![npm](https://img.shields.io/npm/v/@bruneckel/theme-transitions-core.svg)](https://www.npmjs.com/package/@bruneckel/theme-transitions-core) | Framework-agnostic core: theme detection/persistence, View Transition orchestration, effect CSS generation. |
| [`@bruneckel/vue-theme-transitions`](packages/vue) | [![npm](https://img.shields.io/npm/v/@bruneckel/vue-theme-transitions.svg)](https://www.npmjs.com/package/@bruneckel/vue-theme-transitions) | Vue 3 composable built on the core. |
| [`@bruneckel/react-theme-transitions`](packages/react) | [![npm](https://img.shields.io/npm/v/@bruneckel/react-theme-transitions.svg)](https://www.npmjs.com/package/@bruneckel/react-theme-transitions) | React hook built on the core. |

## Development

Run every command from the repo root, the demo apps aren't standalone projects.

Try a demo:

```
npm install
npm run dev:vue-demo
npm run dev:react-demo
```

Everything else:

| Command | Description |
| --- | --- |
| `npm test` | Run the test suite |
| `npm run lint` | Lint all packages |
| `npm run typecheck` | Type-check all packages |
| `npm run build` | Build all packages |

## License

MIT
