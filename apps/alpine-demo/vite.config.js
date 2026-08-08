import { defineConfig } from 'vite';

// This demo is intentionally zero-build: index.html loads the local built
// dist/ output of packages/core and packages/alpine via plain relative
// <script>/<link> tags (mirroring how a consumer would point those tags at
// a CDN). Vite's dev server root defaults to this directory, and browsers
// cannot resolve "../../" past the page's own URL root, so those local
// dist references would 404 without this. Pointing root at the repo root
// keeps index.html's relative paths working exactly as a plain static
// file server would resolve them from disk.
export default defineConfig({
	root: '../..',
	server: {
		open: '/apps/alpine-demo/',
	},
});
