<script setup lang="ts">
import { ref } from "vue";
import { useThemeTransition } from "@bruneckel/vue-theme-transitions";
import { originFromEvent } from "@bruneckel/theme-transitions-core";
import type { ThemeMode } from "@bruneckel/theme-transitions-core";
import EffectSettings, { type EffectOptions } from "./components/EffectSettings.vue";
import ThemeModeSwitch from "./components/ThemeModeSwitch.vue";

const { theme, mode, isAnimating, toggleTheme, setTheme } = useThemeTransition({
  variant: "spread",
});

const effectOptions = ref<EffectOptions>({
  variant: "spread",
  duration: "1s",
  easing: "",
  radius: "",
});
const isValid = ref(true);

const handleSetMode = (target: ThemeMode, event: MouseEvent) => {
  if (!isValid.value) return;

  setTheme(target, {
    origin: originFromEvent(event),
    ...effectOptions.value,
  });
};
</script>

<template>
  <div class="page">
    <header class="page-header">
      <h1>Theme Transitions</h1>
      <p>A Vue demo of animated theme switching.</p>
    </header>

    <ThemeModeSwitch
      :mode="mode"
      :disabled="isAnimating || !isValid"
      @select="handleSetMode"
    />

    <p class="hint" :class="{ invisible: mode !== 'system' }">
      Following system, currently {{ theme }}.
    </p>

    <EffectSettings v-model="effectOptions" v-model:valid="isValid" />

    <section class="simple-example">
      <p class="simple-example-caption">
        Simple toggle, origin detected automatically from the click
      </p>
      <button
        class="simple-toggle"
        :disabled="isAnimating"
        @click="toggleTheme"
      >
        {{ theme }}
      </button>
    </section>
  </div>
</template>

<style scoped>
.page {
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.page-header {
  text-align: center;
}

.page-header h1 {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
}

.page-header p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.hint {
  margin: -1rem 0 0;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.hint.invisible {
  visibility: hidden;
}

.simple-example {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.simple-example-caption {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
}

.simple-toggle {
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.65rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.15s;
}

.simple-toggle:hover:not(:disabled) {
  background: var(--border);
}

.simple-toggle:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
