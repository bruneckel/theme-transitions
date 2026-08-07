[![brustack/theme-transitions](apps/showcase/public/og-image.png)](https://theme-transitions.brustack.dev)

# theme-transitions

[![license](https://img.shields.io/badge/license-MIT-3178C6?style=flat-square)](LICENSE)
![View Transitions API](https://img.shields.io/badge/View%20Transitions%20API-111111?style=flat-square)
![Vue](https://img.shields.io/badge/Vue-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Nuxt](https://img.shields.io/badge/Nuxt-00DC82?style=flat-square&logo=nuxt&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)

🌗 Animated dark/light theme transitions for the web, powered by the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API).

[Live demo](https://theme-transitions.brustack.dev) &middot; [Report a bug](https://github.com/brustack/theme-transitions/issues)

![Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor](.github/assets/demo.gif)

A framework-agnostic core with a thin adapter per framework. Vue, React, Nuxt, and Next.js are available today.

> [!NOTE]
> This is the **source monorepo**, for contributing to the packages themselves. If you just want to *use* one of them in your own project, jump straight to its README via the table below and `npm install` it normally. Don't clone this repo or copy a demo app out of it.

## Features

- Spread and fade transition effects, triggered from any click origin
- Automatic theme persistence and system-preference detection
- No flash of the wrong theme on page load
- Zero dependencies in the core; each adapter only depends on its own framework

## Packages

| Package | npm | Description |
| --- | --- | --- |
| [`@brustack/theme-transitions-core`](packages/core) | [![npm](https://img.shields.io/npm/v/@brustack/theme-transitions-core.svg)](https://www.npmjs.com/package/@brustack/theme-transitions-core) | Framework-agnostic core: theme detection/persistence, View Transition orchestration, effect CSS generation. |
| [`@brustack/vue-theme-transitions`](packages/vue) | [![npm](https://img.shields.io/npm/v/@brustack/vue-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/vue-theme-transitions) | Vue 3 composable built on the core. |
| [`@brustack/react-theme-transitions`](packages/react) | [![npm](https://img.shields.io/npm/v/@brustack/react-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/react-theme-transitions) | React hook built on the core. |
| [`@brustack/nuxt-theme-transitions`](packages/nuxt) | [![npm](https://img.shields.io/npm/v/@brustack/nuxt-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/nuxt-theme-transitions) | Nuxt module built on the core. |
| [`@brustack/next-theme-transitions`](packages/next) | [![npm](https://img.shields.io/npm/v/@brustack/next-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/next-theme-transitions) | Next.js App Router hook and anti-flash script component built on the core. |

## Development

This section is for working on the packages themselves, not for using them. Run every command from the repo root. The demo apps (`apps/react-demo`, `apps/vue-demo`, `apps/showcase`) are npm workspaces symlinked to the local, in-progress source, not the published npm packages, so they only run correctly from inside this repo. They aren't standalone starter templates you can copy elsewhere.

Try a demo:

```
npm install
npm run dev:vue-demo
npm run dev:react-demo
npm run dev:showcase
```

Everything else:

| Command | Description |
| --- | --- |
| `npm test` | Run the test suite |
| `npm run lint` | Lint all packages |
| `npm run typecheck` | Type-check all packages |
| `npm run build` | Build all packages |

## License

[MIT License](LICENSE)

Copyright (c) 2026 Bruno Neckel
