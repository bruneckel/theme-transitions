import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { themeTransitions } from '@bruneckel/vue-theme-transitions/vite';

export default defineConfig({
	plugins: [vue(), themeTransitions()],
});
