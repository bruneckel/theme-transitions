import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

await build({
	entryPoints: [fileURLToPath(new URL('../src/cdn.ts', import.meta.url))],
	outfile: fileURLToPath(new URL('../dist/alpine-theme-transitions.iife.js', import.meta.url)),
	bundle: true,
	format: 'iife',
	minify: true,
	target: 'es2020',
});
