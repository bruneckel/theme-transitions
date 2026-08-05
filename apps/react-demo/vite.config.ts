import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { themeTransitions } from '@bruneckel/theme-transitions-core/vite';

export default defineConfig({
	plugins: [react(), themeTransitions()],
});
