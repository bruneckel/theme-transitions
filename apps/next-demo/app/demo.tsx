'use client';

import { useState } from 'react';
import { useThemeTransition } from '@brustack/next-theme-transitions';
import { originFromEvent } from '@brustack/theme-transitions-core';
import type { ThemeName } from '@brustack/theme-transitions-core';
import { EffectSettings } from './components/EffectSettings';
import type { EffectOptions } from './components/EffectSettings';
import { ThemeModeSwitch } from './components/ThemeModeSwitch';
import './demo.css';

export const Demo = () => {
	const { theme, mode, isAnimating, toggleTheme, setTheme } = useThemeTransition({
		variant: 'fade',
		themes: ['sepia'],
	});

	const [effectOptions, setEffectOptions] = useState<EffectOptions>({
		variant: 'fade',
		duration: '400ms',
		easing: 'ease',
	});
	const [isValid, setIsValid] = useState(true);

	const handleSetMode = (target: ThemeName, event: React.MouseEvent) => {
		if (!isValid) return;

		setTheme(target, { origin: originFromEvent(event), ...effectOptions });
	};

	return (
		<div className="page">
			<header className="page-header">
				<h1>Theme Transitions</h1>
				<p>A Next.js demo of animated theme switching.</p>
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
						Following system, currently <strong>{theme}</strong>.
					</p>
				</div>
			</section>
		</div>
	);
};
