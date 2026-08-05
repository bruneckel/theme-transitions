import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { themeTransitions } from '@brustack/theme-transitions-core/vite';

export default defineConfig({
	plugins: [react(), themeTransitions()],
});
