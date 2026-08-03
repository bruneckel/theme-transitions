import { describe, expect, it } from 'vitest';
import { originFromElement, originFromEvent } from './origin';

describe('originFromEvent', () => {
	it('reads clientX/clientY from the event', () => {
		const event = { clientX: 120, clientY: 45 } as MouseEvent;
		expect(originFromEvent(event)).toEqual({ x: 120, y: 45 });
	});
});

describe('originFromElement', () => {
	it('returns null for a null element', () => {
		expect(originFromElement(null)).toBeNull();
	});

	it('computes the center of the element bounding rect', () => {
		const element = {
			getBoundingClientRect: () => ({
				left: 10,
				top: 20,
				width: 100,
				height: 50,
			}),
		} as unknown as HTMLElement;

		expect(originFromElement(element)).toEqual({ x: 60, y: 45 });
	});
});
