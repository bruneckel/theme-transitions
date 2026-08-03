# vue-demo

A small Vite + Vue app for manually testing [`@bruneckel/vue-theme-transitions`](../../packages/vue) in a real browser.

## Run

```
npm run dev:vue-demo
```

from the repo root, or `npm run dev` from inside this folder.

## What to check

- The button shows the current theme and toggles it on click, with a spread transition starting from the button.
- Reloading the page does not flash the wrong theme before it loads.
- The button is disabled while the transition is animating.

This app is not published and is excluded from the repo's shared lint/typecheck.
