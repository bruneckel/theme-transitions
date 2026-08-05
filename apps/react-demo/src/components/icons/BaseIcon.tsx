import type { ReactNode, SVGProps } from 'react';

interface BaseIconProps extends SVGProps<SVGSVGElement> {
	size?: number;
	children: ReactNode;
}

export const BaseIcon = ({ size = 16, children, ...props }: BaseIconProps) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		{children}
	</svg>
);
