<script setup lang="ts">
import { useThemeTransition } from '@bruneckel/vue-theme-transitions';
import { originFromEvent } from '@bruneckel/theme-transitions-core';

const { theme, isAnimating, toggleTheme } = useThemeTransition({ variant: 'spread' });
</script>

<template>
	<button :disabled="isAnimating" @click="toggleTheme({ origin: originFromEvent($event) })">
		{{ theme }}
	</button>
</template>
