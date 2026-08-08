export default defineNuxtConfig({
	modules: ['@brustack/nuxt-theme-transitions'],
	themeTransition: {
		variant: 'fade',
		themes: ['sepia'],
	},
	css: ['~/assets/main.css'],
	app: {
		head: {
			title: 'Nuxt Theme Transitions Demo',
			link: [
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap',
				},
			],
		},
	},
	compatibilityDate: '2026-01-01',
});
