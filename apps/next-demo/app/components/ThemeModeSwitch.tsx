import type { ThemeName } from '@brustack/theme-transitions-core';
import { IconDroplet } from './icons/IconDroplet';
import { IconMonitor } from './icons/IconMonitor';
import { IconMoon } from './icons/IconMoon';
import { IconSun } from './icons/IconSun';
import './ThemeModeSwitch.css';

export interface ThemeModeSwitchProps {
	mode: ThemeName;
	disabled: boolean;
	onSelect: (mode: ThemeName, event: React.MouseEvent) => void;
}

const options: { value: ThemeName; label: string; Icon: typeof IconSun }[] = [
	{ value: 'system', label: 'System', Icon: IconMonitor },
	{ value: 'light', label: 'Light', Icon: IconSun },
	{ value: 'dark', label: 'Dark', Icon: IconMoon },
	{ value: 'sepia', label: 'Sepia', Icon: IconDroplet },
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
