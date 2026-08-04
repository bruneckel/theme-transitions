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
  width: 100%;
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.9rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.mode-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-muted);
  background: none;
  border: none;
  border-radius: 0.65rem;
  padding: 0.6rem 0.5rem;
  cursor: pointer;
  transition:
    background-color 0.15s,
    color 0.15s;
}

.mode-option:hover:not(:disabled):not(.active) {
  background: var(--border);
}

.mode-option.active {
  color: var(--bg);
  background: var(--text);
}

.mode-option:disabled:not(.active) {
  opacity: 0.6;
  cursor: not-allowed;
}

.mode-option.active:disabled {
  cursor: default;
}
</style>
