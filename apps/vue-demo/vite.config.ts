import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { themeTransitions } from '@bruneckel/theme-transitions-core/vite';

export default defineConfig({
	plugins: [vue(), themeTransitions()],
});
