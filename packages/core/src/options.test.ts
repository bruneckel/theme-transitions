import { describe, expect, it } from 'vitest';
import { resolveOptions } from './options';

describe('resolveOptions', () => {
	it('converts a click-event-like object into an origin', () => {
		expect(resolveOptions({ clientX: 10, clientY: 20 })).toEqual({
			origin: { x: 10, y: 20 },
		});
	});

	it('converts a React SyntheticEvent-shaped object into an origin', () => {
		const syntheticEvent = { clientX: 5, clientY: 7, type: 'click' };
		expect(resolveOptions(syntheticEvent)).toEqual({ origin: { x: 5, y: 7 } });
	});

	it('returns a TransitionOptions object unchanged', () => {
		const options = { variant: 'fade' as const, duration: '2s' };
		expect(resolveOptions(options)).toBe(options);
	});

	it('returns an empty object when given undefined', () => {
		expect(resolveOptions()).toEqual({});
	});
});
