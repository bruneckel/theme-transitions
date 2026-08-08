import { BaseIcon } from './BaseIcon';
import type { IconProps } from './BaseIcon';

export const IconDroplet = ({ size, ...props }: IconProps) => (
	<BaseIcon size={size} {...props}>
		<path d="M12 2.69 17.66 8.5a8 8 0 1 1-11.31 0z" />
	</BaseIcon>
);
