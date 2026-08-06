<script setup lang="ts">
import { originFromElement } from "@brustack/theme-transitions-core";
import type { ThemeMode, ThemeOrigin } from "@brustack/theme-transitions-core";

defineProps<{
  mode: ThemeMode;
  theme: "light" | "dark";
}>();

const emit = defineEmits<{
  select: [mode: ThemeMode, origin: ThemeOrigin | null];
}>();

const options: ThemeMode[] = ["system", "light", "dark"];
</script>

<template>
  <div class="control-group">
    <span class="control-label">Mode</span>
    <div class="pill-group" role="group" aria-label="Theme mode">
      <button
        v-for="option in options"
        :key="option"
        type="button"
        :aria-pressed="mode === option"
        @click="
          emit(
            'select',
            option,
            originFromElement($event.currentTarget as HTMLElement),
          )
        "
      >
        {{ option }}
      </button>
    </div>
    <span v-if="mode === 'system'" class="status-line"
      >detected: {{ theme }}</span
    >
  </div>
</template>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
}

.control-label {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.7;
  padding-right: 0.35rem;
}

.pill-group {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
}

.pill-group button {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  border: none;
  background: transparent;
  color: var(--text-muted);
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.pill-group button[aria-pressed="true"] {
  background: var(--text);
  color: var(--bg);
}

.pill-group button:focus-visible {
  outline: 2px solid var(--accent-incoming);
  outline-offset: 2px;
}

.status-line {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.6875rem;
  color: var(--text-muted);
  opacity: 0.75;
  padding-right: 0.35rem;
}

@media (max-width: 68.75rem) {
  .control-label {
    display: none;
  }
}
</style>
