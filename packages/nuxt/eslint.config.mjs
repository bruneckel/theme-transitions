// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	tseslint.configs.recommended,
	stylistic.configs.customize({
		indent: 'tab',
		quotes: 'single',
		semi: true,
	}),
	{
		files: ['src/shims-nuxt.d.ts'],
		rules: {
			'@typescript-eslint/no-empty-object-type': 'off',
		},
	},
);
