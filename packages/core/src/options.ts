import { originFromEvent } from './origin';
import type { EventLike } from './origin';
import type { TransitionOptions } from './types';

const isEventLike = (value: unknown): value is EventLike =>
	typeof value === 'object'
	&& value !== null
	&& 'clientX' in value
	&& 'clientY' in value;

export const resolveOptions = (
	eventOrOpts?: EventLike | TransitionOptions,
): TransitionOptions => {
	if (isEventLike(eventOrOpts)) {
		return { origin: originFromEvent(eventOrOpts) };
	}

	return eventOrOpts ?? {};
};
