import type { ThemeMode, ThemeName } from '@brustack/theme-transitions-core';
import { IconMonitor } from './icons/IconMonitor';
import { IconMoon } from './icons/IconMoon';
import { IconSun } from './icons/IconSun';
import './ThemeModeSwitch.css';

export interface ThemeModeSwitchProps {
	mode: ThemeName;
	disabled: boolean;
	onSelect: (mode: ThemeMode, event: React.MouseEvent) => void;
}

const options: { value: ThemeMode; label: string; Icon: typeof IconSun }[] = [
	{ value: 'light', label: 'Light', Icon: IconSun },
	{ value: 'dark', label: 'Dark', Icon: IconMoon },
	{ value: 'system', label: 'System', Icon: IconMonitor },
];

export const ThemeModeSwitch = ({ mode, disabled, onSelect }: ThemeModeSwitchProps) => (
	<div className="mode-switch" role="group" aria-label="Theme mode">
		{options.map(({ value, label, Icon }) => (
			<button
				key={value}
				type="button"
				className={`mode-option${mode === value ? ' active' : ''}`}
				disabled={disabled || mode === value}
				onClick={(event) => onSelect(value, event)}
			>
				<Icon size={16} aria-hidden="true" />
				{label}
			</button>
		))}
	</div>
);
