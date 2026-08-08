---
"@brustack/theme-transitions-core": minor
"@brustack/react-theme-transitions": minor
"@brustack/vue-theme-transitions": minor
"@brustack/next-theme-transitions": minor
"@brustack/nuxt-theme-transitions": minor
---

Add support for custom theme names beyond light/dark/system: pass `themes: string[]` to register additional names (e.g. `getController({ themes: ['pink'] })`, then `setTheme('pink')`), and read the full list back from `themes` in state to build a theme switcher.
