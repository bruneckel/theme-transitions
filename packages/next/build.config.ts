import { defineBuildConfig } from 'unbuild';
import { preserveDirectives } from 'rollup-plugin-preserve-directives';

export default defineBuildConfig({
	entries: ['src/index'],
	declaration: true,
	clean: true,
	rollup: {
		output: {
			preserveModules: true,
		},
	},
	hooks: {
		'rollup:options'(_ctx, options) {
			options.plugins = [options.plugins, preserveDirectives()].flat();
		},
	},
});
