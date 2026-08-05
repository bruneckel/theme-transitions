import { useEffect, useState } from 'react';
import { defaultThemeEffects } from '@bruneckel/theme-transitions-core';
import type { ThemeEffect } from '@bruneckel/theme-transitions-core';
import { IconChevronRight } from './icons/IconChevronRight';
import { IconRotateCcw } from './icons/IconRotateCcw';
import './EffectSettings.css';

export interface EffectOptions {
	variant: ThemeEffect;
	duration: string;
	easing: string;
	radius: string;
}

export interface EffectSettingsProps {
	onChange: (options: EffectOptions, valid: boolean) => void;
}

const easingPresets = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];
const radius = defaultThemeEffects.spread.radius;

export const EffectSettings = ({ onChange }: EffectSettingsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [variant, setVariant] = useState<ThemeEffect>('spread');
	const [duration, setDuration] = useState(defaultThemeEffects.spread.duration);
	const [easingPreset, setEasingPreset] = useState(defaultThemeEffects.fade.easing);

	const easing = variant === 'fade' ? easingPreset : defaultThemeEffects.spread.easing;

	const durationError = variant === 'none'
		? ''
		: /^\d+(\.\d+)?(ms|s)$/.test(duration)
			? ''
			: 'Use a CSS duration, e.g. 1s or 400ms';

	const isModified = (() => {
		if (variant === 'none') return false;

		const defaults = variant === 'fade' ? defaultThemeEffects.fade : defaultThemeEffects.spread;

		if (duration !== defaults.duration) return true;

		return variant === 'fade' && easingPreset !== defaults.easing;
	})();

	const resetToDefaults = () => {
		const defaults = variant === 'fade' ? defaultThemeEffects.fade : defaultThemeEffects.spread;

		setDuration(defaults.duration);
		setEasingPreset(defaultThemeEffects.fade.easing);
	};

	useEffect(() => {
		resetToDefaults();
	}, [variant]);

	useEffect(() => {
		onChange({ variant, duration, easing, radius }, !durationError);
	}, [variant, duration, easing, durationError]);

	return (
		<div className="settings">
			<div className="settings-header">
				<button
					type="button"
					className="settings-toggle"
					aria-expanded={isOpen}
					aria-controls="settings-panel"
					onClick={() => setIsOpen(!isOpen)}
				>
					<IconChevronRight size={14} className={`chevron${isOpen ? ' open' : ''}`} />
					Settings
				</button>

				{isModified && (
					<button
						type="button"
						className="reset"
						aria-label="Reset to defaults"
						title="Reset to defaults"
						onClick={resetToDefaults}
					>
						<IconRotateCcw size={14} aria-hidden="true" />
					</button>
				)}
			</div>

			<div id="settings-panel" className={`settings-collapse${isOpen ? ' open' : ''}`}>
				<div className="settings-collapse-inner">
					<div className="controls">
						<label>
							<span className="label-text">Variant</span>
							<select value={variant} onChange={(event) => setVariant(event.target.value as ThemeEffect)}>
								<option value="spread">spread</option>
								<option value="fade">fade</option>
								<option value="none">none</option>
							</select>
						</label>

						{variant !== 'none' && (
							<>
								<label>
									<span className="label-text">Duration</span>
									<input
										value={duration}
										onChange={(event) => setDuration(event.target.value)}
										type="text"
										placeholder="1s"
										className={durationError ? 'invalid' : ''}
									/>
									{durationError && <span className="error">{durationError}</span>}
								</label>

								{variant === 'fade' && (
									<label>
										<span className="label-text">Easing</span>
										<select value={easingPreset} onChange={(event) => setEasingPreset(event.target.value)}>
											{easingPresets.map((preset) => (
												<option key={preset} value={preset}>
													{preset}
												</option>
											))}
										</select>
									</label>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
