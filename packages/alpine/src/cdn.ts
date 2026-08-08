import themeTransition from './index';

declare global {
	interface Window {
		Alpine: { plugin: (plugin: typeof themeTransition) => void };
	}
}

document.addEventListener('alpine:init', () => {
	window.Alpine.plugin(themeTransition);
});
