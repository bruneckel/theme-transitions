import type { SVGProps } from 'react';
import { BaseIcon } from './BaseIcon';

export const IconChevronRight = ({ size, ...props }: { size?: number } & SVGProps<SVGSVGElement>) => (
	<BaseIcon size={size} {...props}>
		<path d="m9 18 6-6-6-6" />
	</BaseIcon>
);
