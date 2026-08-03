import type { EffectDefinition, FadeEffectOptions } from '../types';
import { parseCssDuration } from '../time';

const vtSelector = (layer: 'old' | 'new') =>
	`html[data-theme-effect="fade"]::view-transition-${layer}(root)`;

const vtGroup = () =>
	`html[data-theme-effect="fade"]::view-transition-group(root)`;

export const defaultFadeOptions: FadeEffectOptions = {
	duration: '400ms',
	easing: 'ease',
};

export const fadeEffect: EffectDefinition = {
	name: 'fade',
	requiresOrigin: false,
	buildCss: (options) => {
		const { duration, easing } = options as FadeEffectOptions;

		return `
      ${vtGroup()} {
        animation-duration: ${duration};
        animation-timing-function: ${easing};
      }

      ${vtSelector('old')} {
        animation-name: theme-fade-out;
        animation-duration: ${duration};
        animation-timing-function: ${easing};
        animation-fill-mode: both;
      }

      ${vtSelector('new')} {
        animation-name: theme-fade-in;
        animation-duration: ${duration};
        animation-timing-function: ${easing};
        animation-fill-mode: both;
      }

      @keyframes theme-fade-out {
        to {
          opacity: 0;
        }
      }

      @keyframes theme-fade-in {
        from {
          opacity: 0;
        }
      }
    `;
	},
	getSkipAfterMs: options =>
		parseCssDuration((options as FadeEffectOptions).duration),
};
