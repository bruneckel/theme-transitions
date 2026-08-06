import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		projects: [
			{
				extends: true,
				test: {
					name: 'core',
					include: ['packages/core/src/**/*.test.ts'],
					environment: 'node',
				},
			},
			{
				extends: true,
				test: {
					name: 'vue',
					include: ['packages/vue/src/**/*.test.ts'],
					environment: 'happy-dom',
				},
			},
			{
				extends: true,
				test: {
					name: 'react',
					include: ['packages/react/src/**/*.test.ts'],
					environment: 'happy-dom',
				},
			},
			{
				extends: true,
				resolve: {
					alias: {
						'#imports': new URL('./packages/nuxt/src/test/imports-stub.ts', import.meta.url).pathname,
					},
				},
				test: {
					name: 'nuxt',
					include: ['packages/nuxt/src/**/*.test.ts'],
					environment: 'happy-dom',
				},
			},
		],
	},
});
