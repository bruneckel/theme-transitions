import { useState } from 'react';
import { useThemeTransition } from '@bruneckel/react-theme-transitions';
import { originFromEvent } from '@bruneckel/theme-transitions-core';
import type { ThemeMode } from '@bruneckel/theme-transitions-core';
import { EffectSettings } from './components/EffectSettings';
import type { EffectOptions } from './components/EffectSettings';
import { ThemeModeSwitch } from './components/ThemeModeSwitch';
import './App.css';

export const App = () => {
	const { theme, mode, isAnimating, toggleTheme, setTheme } = useThemeTransition({ variant: 'fade' });

	const [effectOptions, setEffectOptions] = useState<EffectOptions>({
		variant: 'fade',
		duration: '400ms',
		easing: '',
		radius: '',
	});
	const [isValid, setIsValid] = useState(true);

	const handleSetMode = (target: ThemeMode, event: React.MouseEvent) => {
		if (!isValid) return;

		setTheme(target, { origin: originFromEvent(event), ...effectOptions });
	};

	return (
		<div className="page">
			<header className="page-header">
				<h1>Theme Transitions</h1>
				<p>A React demo of animated theme switching.</p>
			</header>

			<section className="pattern">
				<p className="pattern-title">Simple toggle</p>
				<p className="pattern-code">toggleTheme(event)</p>
				<button className="simple-toggle" disabled={isAnimating} onClick={toggleTheme}>
					{theme}
				</button>
			</section>

			<div className="divider" />

			<section className="pattern">
				<p className="pattern-title">Mode switch</p>
				<p className="pattern-code">ThemeModeSwitch</p>
				<div className="mode-row">
					<ThemeModeSwitch mode={mode} disabled={isAnimating || !isValid} onSelect={handleSetMode} />
					<EffectSettings
						onChange={(options, valid) => {
							setEffectOptions(options);
							setIsValid(valid);
						}}
					/>
					<p className={`hint${mode !== 'system' ? ' invisible' : ''}`}>
						Following system, currently {theme}.
					</p>
				</div>
			</section>
		</div>
	);
};
