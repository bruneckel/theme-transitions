---
"@brustack/theme-transitions-core": minor
"@brustack/react-theme-transitions": major
"@brustack/vue-theme-transitions": major
"@brustack/next-theme-transitions": major
"@brustack/nuxt-theme-transitions": major
---

Add support for custom theme names beyond light/dark/system: pass `themes: string[]` to register additional names (e.g. `getController({ themes: ['pink'] })`, then `setTheme('pink')`), and read the full list back from `themes` in state to build a theme switcher.

Breaking change for the adapters: each hook's returned `.theme`/`.mode` fields and `setTheme`'s parameter widened from a narrow union type to `ThemeName`, so consumers with strict typing on those values may need to update their own type annotations. This follows from a corresponding widening in `@brustack/theme-transitions-core` (covered by the separate major changeset in `namespace-storage-key.md`), where `resolveTheme`'s return type also widened from `'light' | 'dark'` to `string`.
