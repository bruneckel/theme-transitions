import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: ['src/index', 'src/vite-plugin'],
	declaration: true,
	clean: true,
});
