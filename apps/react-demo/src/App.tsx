import { useState } from 'react';
import { useThemeTransition } from '@bruneckel/react-theme-transitions';
import { originFromEvent } from '@bruneckel/theme-transitions-core';
import type { ThemeMode } from '@bruneckel/theme-transitions-core';
import { EffectSettings } from './components/EffectSettings';
import type { EffectOptions } from './components/EffectSettings';
import { ThemeModeSwitch } from './components/ThemeModeSwitch';
import './App.css';

export const App = () => {
	const { theme, mode, isAnimating, setTheme } = useThemeTransition({ variant: 'spread' });

	const [effectOptions, setEffectOptions] = useState<EffectOptions>({
		variant: 'spread',
		duration: '1s',
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

			<ThemeModeSwitch mode={mode} disabled={isAnimating || !isValid} onSelect={handleSetMode} />

			<p className={`hint${mode !== 'system' ? ' invisible' : ''}`}>
				Following system, currently {theme}.
			</p>

			<EffectSettings
				onChange={(options, valid) => {
					setEffectOptions(options);
					setIsValid(valid);
				}}
			/>
		</div>
	);
};
