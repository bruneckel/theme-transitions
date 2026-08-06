# @brustack/nuxt-theme-transitions

[![npm version](https://img.shields.io/npm/v/@brustack/nuxt-theme-transitions.svg)](https://www.npmjs.com/package/@brustack/nuxt-theme-transitions)
[![license](https://img.shields.io/npm/l/@brustack/nuxt-theme-transitions.svg)](https://github.com/brustack/theme-transitions/blob/main/packages/nuxt/LICENSE)

Nuxt module for animated dark/light theme transitions using the View Transitions API.

[Live demo](https://theme-transitions.brustack.dev)

![Demo: clicking anywhere on the page triggers an animated theme transition originating from the cursor](../../.github/assets/demo.gif)

## Install

```sh
npm install @brustack/nuxt-theme-transitions
# or
pnpm add @brustack/nuxt-theme-transitions
# or
yarn add @brustack/nuxt-theme-transitions
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@brustack/nuxt-theme-transitions'],
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
  <button :disabled="isAnimating" @click="toggleTheme">
    {{ theme }}
  </button>
</template>
```

Binding `toggleTheme` directly to `@click` works because it accepts the native `MouseEvent` and derives the spread effect's origin from the click position automatically. Use `originFromElement(elementRef)` instead if you want to animate from the center of an element rather than the click position.

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

**spread**: circle expands from the click. `toggleTheme`/`setTheme` accept a `MouseEvent` (as shown above) or an explicit options object, e.g. `{ origin, variant, duration }`:

```ts
toggleTheme(event)
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
| `toggleTheme(eventOrOptions?)` | Switch between light and dark |
| `setTheme(mode, eventOrOptions?)` | Set `light`, `dark`, or `system` |
| `theme` | Current resolved theme: `'light'` or `'dark'` |
| `mode` | Current preference: `'light'`, `'dark'`, or `'system'` |
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
