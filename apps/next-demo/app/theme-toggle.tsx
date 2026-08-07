'use client';

import { useThemeTransition } from '@brustack/next-theme-transitions';

const modes = ['system', 'light', 'dark'] as const;

export const ThemeToggle = () => {
	const { theme, mode, isAnimating, setTheme } = useThemeTransition({ variant: 'spread' });

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				{modes.map((m) => (
					<button
						key={m}
						type="button"
						disabled={isAnimating}
						aria-pressed={mode === m}
						onClick={(event) => setTheme(m, event)}
					>
						{m}
					</button>
				))}
			</div>
			<p>resolved theme: {theme}</p>
		</div>
	);
};
