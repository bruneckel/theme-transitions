import type { TransitionOptions } from './types';

type EventLike = {
	clientX: number;
	clientY: number;
};

const isEventLike = (value: unknown): value is EventLike =>
	typeof value === 'object'
	&& value !== null
	&& 'clientX' in value
	&& 'clientY' in value;

export const resolveOptions = (
	eventOrOpts?: EventLike | TransitionOptions,
): TransitionOptions => {
	if (isEventLike(eventOrOpts)) {
		return { origin: { x: eventOrOpts.clientX, y: eventOrOpts.clientY } };
	}

	return eventOrOpts ?? {};
};
