# theme-transitions

Animated dark/light theme transitions for the web, powered by the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

A framework-agnostic core with a thin adapter per framework. Vue is available today; React and Next.js are next.

## Features

- Spread and fade transition effects, triggered from any click origin
- Automatic theme persistence and system-preference detection
- No flash of the wrong theme on page load
- Zero dependencies in the core; each adapter only depends on its own framework

## Packages

| Package                                              | Description                                                                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`@bruneckel/theme-transitions-core`](packages/core) | Framework-agnostic core: theme detection/persistence, View Transition orchestration, effect CSS generation. |
| [`@bruneckel/vue-theme-transitions`](packages/vue)   | Vue 3 composable and Vite plugin built on the core.                                                         |

## Development

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm install`          | Install dependencies                    |
| `npm test`             | Run the test suite                      |
| `npm run lint`         | Lint all packages                       |
| `npm run typecheck`    | Type-check all packages                 |
| `npm run build`        | Build all packages                      |
| `npm run dev:vue-demo` | Start the [Vue demo app](apps/vue-demo) |

## License

MIT
