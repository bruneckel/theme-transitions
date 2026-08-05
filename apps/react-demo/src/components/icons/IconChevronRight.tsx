import { BaseIcon } from './BaseIcon';
import type { IconProps } from './BaseIcon';

export const IconChevronRight = ({ size, ...props }: IconProps) => (
	<BaseIcon size={size} {...props}>
		<path d="m9 18 6-6-6-6" />
	</BaseIcon>
);
