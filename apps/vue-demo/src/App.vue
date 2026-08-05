<script setup lang="ts">
import { ref } from "vue";
import { useThemeTransition } from "@bruneckel/vue-theme-transitions";
import { originFromEvent } from "@bruneckel/theme-transitions-core";
import type { ThemeMode } from "@bruneckel/theme-transitions-core";
import EffectSettings, { type EffectOptions } from "./components/EffectSettings.vue";
import ThemeModeSwitch from "./components/ThemeModeSwitch.vue";

const { theme, mode, isAnimating, toggleTheme, setTheme } = useThemeTransition({
  variant: "fade",
});

const effectOptions = ref<EffectOptions>({
  variant: "fade",
  duration: "400ms",
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

    <section class="pattern">
      <p class="pattern-title">Simple toggle</p>
      <p class="pattern-code">toggleTheme(event)</p>
      <button
        class="simple-toggle"
        :disabled="isAnimating"
        @click="toggleTheme"
      >
        {{ theme }}
      </button>
    </section>

    <div class="divider" />

    <section class="pattern">
      <p class="pattern-title">Mode switch</p>
      <p class="pattern-code">ThemeModeSwitch</p>
      <div class="mode-row">
        <ThemeModeSwitch
          :mode="mode"
          :disabled="isAnimating || !isValid"
          @select="handleSetMode"
        />
        <EffectSettings v-model="effectOptions" v-model:valid="isValid" />
        <p class="hint" :class="{ invisible: mode !== 'system' }">
          Following system, currently <strong>{{ theme }}</strong>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
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

.pattern {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.pattern-title {
  align-self: flex-start;
  margin: 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text);
}

.pattern-code {
  align-self: flex-start;
  margin: -0.4rem 0 0;
  font-size: 0.6875rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  color: var(--text-muted);
}

.divider {
  width: 100%;
  border-top: 1px dashed var(--border);
}

.mode-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 0.1rem;
}

.hint {
  flex-basis: 100%;
  margin: 0.3rem 0 0;
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.hint strong {
  color: var(--text);
  font-weight: 600;
}

.hint.invisible {
  visibility: hidden;
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
