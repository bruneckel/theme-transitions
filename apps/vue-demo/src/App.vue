<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useThemeTransition } from "@bruneckel/vue-theme-transitions";
import {
  defaultThemeEffects,
  originFromEvent,
} from "@bruneckel/theme-transitions-core";
import type { ThemeEffect, ThemeMode } from "@bruneckel/theme-transitions-core";

const { theme, mode, isAnimating, setTheme } = useThemeTransition({
  variant: "spread",
});

const modeOptions: { value: ThemeMode; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
  { value: "system", label: "System", icon: "🖥️" },
];

const easingPresets = [
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "linear",
  defaultThemeEffects.spread.easing,
];

const radiusUnits = ["vmax", "vw", "vh", "px", "%"];

const parseRadius = (value: string) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  return match ? { value: Number(match[1]), unit: match[2] } : { value: 150, unit: "vmax" };
};

const defaultRadius = parseRadius(defaultThemeEffects.spread.radius);

const variant = ref<ThemeEffect>("spread");
const duration = ref(defaultThemeEffects.spread.duration);
const easingPreset = ref(defaultThemeEffects.spread.easing);
const customEasing = ref("");
const radiusValue = ref(defaultRadius.value);
const radiusUnit = ref(defaultRadius.unit);

const easing = computed(() =>
  easingPreset.value === "custom" ? customEasing.value : easingPreset.value
);
const radius = computed(() => `${radiusValue.value}${radiusUnit.value}`);

const durationError = computed(() => {
  if (variant.value === "none") return "";
  return /^\d+(\.\d+)?(ms|s)$/.test(duration.value)
    ? ""
    : "Use a CSS duration, e.g. 1s or 400ms";
});

const easingError = computed(() => {
  if (variant.value === "none" || easingPreset.value !== "custom") return "";
  return customEasing.value.trim() ? "" : "Easing can't be empty";
});

const radiusError = computed(() => {
  if (variant.value !== "spread") return "";
  return radiusValue.value > 0 ? "" : "Radius must be greater than 0";
});

const isValid = computed(
  () => !durationError.value && !easingError.value && !radiusError.value
);

const resetToDefaults = () => {
  const defaults =
    variant.value === "fade"
      ? defaultThemeEffects.fade
      : defaultThemeEffects.spread;

  duration.value = defaults.duration;
  easingPreset.value = easingPresets.includes(defaults.easing)
    ? defaults.easing
    : "custom";
  customEasing.value = easingPreset.value === "custom" ? defaults.easing : "";
  radiusValue.value = defaultRadius.value;
  radiusUnit.value = defaultRadius.unit;
};

watch(variant, resetToDefaults);

const handleSetMode = (target: ThemeMode, event: MouseEvent) => {
  if (!isValid.value) return;

  setTheme(target, {
    origin: originFromEvent(event),
    variant: variant.value,
    duration: duration.value,
    easing: easing.value,
    radius: radius.value,
  });
};
</script>

<template>
  <div class="page">
    <header class="page-header">
      <h1>Theme Transitions</h1>
      <p>Vue demo for animated light, dark, and system mode switching.</p>
    </header>

    <div class="mode-switch" role="group" aria-label="Theme mode">
      <button
        v-for="option in modeOptions"
        :key="option.value"
        type="button"
        class="mode-option"
        :class="{ active: mode === option.value }"
        :disabled="isAnimating || !isValid || mode === option.value"
        @click="handleSetMode(option.value, $event)"
      >
        <span aria-hidden="true">{{ option.icon }}</span>
        {{ option.label }}
      </button>
    </div>

    <p class="hint" :class="{ invisible: mode !== 'system' }">Following system, currently {{ theme }}.</p>

    <details class="settings">
      <summary>Settings</summary>

      <div class="controls">
        <label>
          <span class="label-text">Variant</span>
          <select v-model="variant">
            <option value="spread">spread</option>
            <option value="fade">fade</option>
            <option value="none">none</option>
          </select>
        </label>

        <template v-if="variant !== 'none'">
          <label>
            <span class="label-text">Duration</span>
            <input v-model="duration" type="text" placeholder="1s" :class="{ invalid: durationError }" />
            <span v-if="durationError" class="error">{{ durationError }}</span>
          </label>

          <label>
            <span class="label-text">Easing</span>
            <select v-model="easingPreset">
              <option v-for="preset in easingPresets" :key="preset" :value="preset">
                {{ preset }}
              </option>
              <option value="custom">custom</option>
            </select>
            <input
              v-if="easingPreset === 'custom'"
              v-model="customEasing"
              type="text"
              placeholder="cubic-bezier(...)"
              :class="{ invalid: easingError }"
            />
            <span v-if="easingError" class="error">{{ easingError }}</span>
          </label>

          <label v-if="variant === 'spread'">
            <span class="label-text">Radius</span>
            <span class="radius-fields">
              <input v-model.number="radiusValue" type="number" min="0" :class="{ invalid: radiusError }" />
              <select v-model="radiusUnit">
                <option v-for="unit in radiusUnits" :key="unit" :value="unit">
                  {{ unit }}
                </option>
              </select>
            </span>
            <span v-if="radiusError" class="error">{{ radiusError }}</span>
          </label>

          <button type="button" class="reset" @click="resetToDefaults">
            Reset to defaults
          </button>
        </template>
      </div>
    </details>
  </div>
</template>

<style>
html {
  --bg: #f4f4f5;
  --surface: #ffffff;
  --border: #e4e4e7;
  --text: #18181b;
  --text-muted: #71717a;
  --accent: #6366f1;
  --accent-contrast: #ffffff;
  --danger: #dc2626;

  background: var(--bg);
  color: var(--text);
  color-scheme: light;
}

html.dark {
  --bg: #18181b;
  --surface: #27272a;
  --border: #3f3f46;
  --text: #fafafa;
  --text-muted: #a1a1aa;
  --accent: #818cf8;
  --accent-contrast: #18181b;

  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

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

.settings {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
}

.settings summary {
  cursor: pointer;
  padding: 0.6rem 0.9rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
}

.settings[open] summary {
  border-bottom: 1px solid var(--border);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.9rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-size: 0.8125rem;
}

.label-text {
  color: var(--text-muted);
  font-weight: 500;
}

input,
select {
  font: inherit;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
}

input:focus-visible,
select:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

input.invalid {
  border-color: var(--danger);
}

.radius-fields {
  display: flex;
  gap: 0.5rem;
}

.radius-fields input {
  width: 100%;
  min-width: 0;
}

.error {
  color: var(--danger);
  font-size: 0.75rem;
}

.reset {
  align-self: flex-start;
  font: inherit;
  font-size: 0.75rem;
  color: var(--text-muted);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
}

.reset:hover {
  color: var(--text);
}

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
  transition: background-color 0.15s, color 0.15s;
}

.mode-option:hover:not(:disabled):not(.active) {
  background: var(--border);
}

.mode-option.active {
  color: var(--accent-contrast);
  background: var(--accent);
}

.mode-option:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
