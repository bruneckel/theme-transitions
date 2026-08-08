import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ThemeScript } from '@brustack/next-theme-transitions';
import '@brustack/theme-transitions-core/style.css';
import './globals.css';

export const metadata: Metadata = {
	title: 'Next.js Theme Transitions Demo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<ThemeScript themes={['sepia']} />
			</head>
			<body>{children}</body>
		</html>
	);
}
