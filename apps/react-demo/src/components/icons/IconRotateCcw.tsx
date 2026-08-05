import type { SVGProps } from 'react';
import { BaseIcon } from './BaseIcon';

export const IconRotateCcw = ({ size, ...props }: { size?: number } & SVGProps<SVGSVGElement>) => (
	<BaseIcon size={size} {...props}>
		<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
		<path d="M3 3v5h5" />
	</BaseIcon>
);
