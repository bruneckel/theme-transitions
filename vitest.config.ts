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
		],
	},
});
