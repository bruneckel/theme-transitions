<script setup lang="ts">
import { ref } from "vue";
import { useThemeTransition } from "@bruneckel/vue-theme-transitions";
import { originFromEvent } from "@bruneckel/theme-transitions-core";
import type { ThemeMode } from "@bruneckel/theme-transitions-core";
import EffectSettings from "./components/EffectSettings.vue";
import ThemeModeSwitch from "./components/ThemeModeSwitch.vue";
import type { EffectOptions } from "./components/EffectSettings.vue";

const { theme, mode, isAnimating, setTheme } = useThemeTransition({
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
</style>
