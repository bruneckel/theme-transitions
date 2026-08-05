<script setup lang="ts">
import type { Component } from "vue";
import type { ThemeMode } from "@bruneckel/theme-transitions-core";
import IconMonitor from "./icons/IconMonitor.vue";
import IconMoon from "./icons/IconMoon.vue";
import IconSun from "./icons/IconSun.vue";

defineProps<{
  mode: ThemeMode;
  disabled: boolean;
}>();

const emit = defineEmits<{
  select: [mode: ThemeMode, event: MouseEvent];
}>();

const options: { value: ThemeMode; label: string; icon: Component }[] = [
  { value: "light", label: "Light", icon: IconSun },
  { value: "dark", label: "Dark", icon: IconMoon },
  { value: "system", label: "System", icon: IconMonitor },
];
</script>

<template>
  <div class="mode-switch" role="group" aria-label="Theme mode">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="mode-option"
      :class="{ active: mode === option.value }"
      :disabled="disabled || mode === option.value"
      @click="emit('select', option.value, $event)"
    >
      <component :is="option.icon" :size="16" aria-hidden="true" />
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.mode-switch {
  order: 1;
  flex: 1;
  display: flex;
  gap: 1rem;
}

.mode-option {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-muted);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0 0 0.25rem;
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s;
}

.mode-option:hover:not(:disabled):not(.active) {
  color: var(--text);
}

.mode-option.active {
  color: var(--text);
  border-bottom-color: var(--text);
}

.mode-option:disabled:not(.active) {
  opacity: 0.6;
  cursor: not-allowed;
}

.mode-option.active:disabled {
  cursor: default;
}
</style>
