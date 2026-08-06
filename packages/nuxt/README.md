# nuxt-theme-transitions

[![npm version](https://img.shields.io/npm/v/@bruneckel/nuxt-theme-transitions.svg)](https://www.npmjs.com/package/@bruneckel/nuxt-theme-transitions)
[![license](https://img.shields.io/npm/l/@bruneckel/nuxt-theme-transitions.svg)](https://github.com/bruneckel/nuxt-theme-transitions/blob/main/LICENSE)

Animated dark/light theme toggle for Nuxt.

## Install

```sh
npm install @bruneckel/nuxt-theme-transitions
# or
pnpm add @bruneckel/nuxt-theme-transitions
# or
yarn add @bruneckel/nuxt-theme-transitions
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@bruneckel/nuxt-theme-transitions'],
})
```

If you're migrating from `@nuxtjs/color-mode`, remove it from the `modules` array (and uninstall it).

> [!IMPORTANT]
> Using Tailwind? Set `darkMode: 'class'` in your Tailwind config. Tailwind's default (`'media'`) ignores the `dark`/`light` class this package applies to `<html>`, so the toggle will silently have no visual effect without it.

## Usage

```vue
<script setup lang="ts">
const { theme, isAnimating, toggleTheme } = useThemeTransition()
</script>

<template>
  <button
    :disabled="isAnimating"
    @click="toggleTheme({ origin: originFromEvent($event) })"
  >
    Toggle theme
  </button>
</template>
```

Use `originFromElement(buttonRef)` to animate from the center of an element instead of the click position.

Disable the button with `:disabled="isAnimating"` to avoid double-clicks while the animation runs.

## Configuration (optional)

| Option | Default | Description |
|--------|---------|-------------|
| `variant` | `'fade'` | `'spread'` (circle from click) or `'fade'` (crossfade) |
| `duration` | `'1.5s'` (spread) / `'400ms'` (fade) | How long the animation lasts (e.g. `'2s'`) |
| `easing` | `'ease'` | Fade only, any CSS easing function. `spread`'s easing and clip-path radius are fixed and not configurable |

```ts
themeTransition: {
  variant: 'spread',
  duration: '1.5s',
}
```

Restart the dev server after changing `themeTransition`.

## Variants

**spread**: circle expands from the click. Pass an origin:

```ts
toggleTheme({ origin: originFromEvent($event) })
toggleTheme({ origin: originFromElement(buttonRef.value) })
```

**fade**: smooth crossfade, no origin needed:

```ts
toggleTheme({ variant: 'fade' })
setTheme('dark', { variant: 'fade' })
```

`toggleTheme`/`setTheme` also accept a `duration` (and, for `fade`, an `easing`) override, e.g. `toggleTheme({ duration: '2s' })`. This overrides the module's configured value for that one call only.

## API

| | |
|---|---|
| `toggleTheme(options?)` | Switch between light and dark |
| `setTheme(mode, options?)` | Set `light`, `dark`, or `system` |
| `theme` | Current resolved theme: `'light'` or `'dark'` |
| `isAnimating` | `true` while a transition is running |
| `originFromEvent(event)` | Click position for spread |
| `originFromElement(el)` | Element center for spread |

## Browser support

| Browser | Animation |
|---------|-----------|
| Chrome, Edge, Safari 18+ | Yes |
| Firefox | Instant switch |
| Reduced motion | Instant switch |

## Known issues

- Chrome 150 has a regression where the `spread` effect's clip-path animation can render from the wrong position after the browser window moves between displays with different DPI/scaling. This is a Chrome bug, not something this package can work around. It's already fixed upstream and verified in Chrome Canary; the fix should reach the Stable channel in a future release. See [Chromium issue #535696703](https://issues.chromium.org/issues/535696703).

## License

[MIT](LICENSE) © Bruno Neckel
