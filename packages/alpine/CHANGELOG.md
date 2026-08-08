# @brustack/alpine-theme-transitions

## 1.0.0

### Major Changes

- Add the Alpine.js adapter (`@brustack/alpine-theme-transitions`), with both an npm/ESM entry point and a self-registering CDN/IIFE build for zero-build usage (Blade, ERB, static HTML). The core package now also ships a static `dist/theme-init.js`, a prebuilt copy of the anti-flash init script for zero-build consumers who can't call `buildColorModeInitScript()` themselves.

### Patch Changes

- Updated dependencies
  - @brustack/theme-transitions-core@2.2.0
