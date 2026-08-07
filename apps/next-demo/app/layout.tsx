import type { ReactNode } from 'react';
import { ThemeScript } from '@brustack/next-theme-transitions';
import '@brustack/theme-transitions-core/style.css';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ThemeScript variant="spread" duration="1.5s" />
			</head>
			<body>{children}</body>
		</html>
	);
}
