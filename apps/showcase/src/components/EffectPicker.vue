<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  defaultThemeEffects,
  isValidCssDuration,
} from "@brustack/theme-transitions-core";
import type { ThemeEffect } from "@brustack/theme-transitions-core";
import IconRotateCcw from "./icons/IconRotateCcw.vue";
import IconSettings from "./icons/IconSettings.vue";

export interface EffectOptions {
  variant: ThemeEffect;
  duration: string;
  easing?: string;
}

const options = defineModel<EffectOptions>({ required: true });

const isOpen = ref(false);
const variants: ThemeEffect[] = ["spread", "fade", "none"];
const easingPresets = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];

const variant = ref(options.value.variant);
const duration = ref(options.value.duration);
const easingPreset = ref(defaultThemeEffects.fade.easing);

const durationError = computed(() => {
  if (variant.value === "none") return "";
  return isValidCssDuration(duration.value)
    ? ""
    : "Use a CSS duration, e.g. 1s or 400ms";
});

const isModified = computed(() => {
  if (variant.value !== "spread") return true;

  const defaults = defaultThemeEffects.spread;

  return duration.value !== defaults.duration;
});

const applyVariantDefaults = () => {
  const defaults =
    variant.value === "fade"
      ? defaultThemeEffects.fade
      : defaultThemeEffects.spread;
  duration.value = defaults.duration;
  easingPreset.value = defaultThemeEffects.fade.easing;
};

const resetToDefaults = () => {
  variant.value = "spread";
  applyVariantDefaults();
};

watch(variant, applyVariantDefaults);

watch(
  [variant, duration, easingPreset],
  () => {
    options.value =
      variant.value === "fade"
        ? {
            variant: variant.value,
            duration: duration.value,
            easing: easingPreset.value,
          }
        : { variant: variant.value, duration: duration.value };
  },
  { immediate: true },
);
</script>

<template>
  <div class="control-group">
    <span class="control-label">Effect</span>
    <div class="effect-row">
      <div
        class="pill-group desktop-only-variant"
        role="group"
        aria-label="Transition variant"
      >
        <button
          v-for="option in variants"
          :key="option"
          type="button"
          :aria-pressed="variant === option"
          @click="variant = option"
        >
          {{ option }}
        </button>
      </div>
      <button
        type="button"
        class="gear-btn"
        :aria-expanded="isOpen"
        aria-controls="settings-panel"
        aria-label="Effect settings"
        @click="isOpen = !isOpen"
      >
        <IconSettings :size="15" aria-hidden="true" />
        <span v-if="isModified" class="modified-dot" aria-hidden="true" />
      </button>
    </div>

    <div id="settings-panel" class="settings-panel" :class="{ open: isOpen }">
      <div class="settings-inner">
        <div class="field-block mobile-only-variant">
          <span class="field-label">Effect</span>
          <div class="pill-group" role="group" aria-label="Transition variant">
            <button
              v-for="option in variants"
              :key="option"
              type="button"
              :aria-pressed="variant === option"
              @click="variant = option"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <template v-if="variant !== 'none'">
          <label>
            <span>Duration</span>
            <input
              v-model="duration"
              type="text"
              :class="{ invalid: durationError }"
            />
          </label>
          <span v-if="durationError" class="field-error">{{
            durationError
          }}</span>

          <label v-if="variant === 'fade'">
            <span>Easing</span>
            <select v-model="easingPreset">
              <option
                v-for="preset in easingPresets"
                :key="preset"
                :value="preset"
              >
                {{ preset }}
              </option>
            </select>
          </label>
        </template>
        <p v-else class="none-note">No animation, theme switches instantly.</p>

        <button
          v-if="isModified"
          type="button"
          class="reset-btn"
          @click="resetToDefaults"
        >
          <IconRotateCcw :size="12" aria-hidden="true" />
          Reset to defaults
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.control-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
  position: relative;
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

.effect-row {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
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

.pill-group button:focus-visible,
.gear-btn:focus-visible {
  outline: 2px solid var(--accent-incoming);
  outline-offset: 2px;
}

.gear-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.9rem;
  height: 1.9rem;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.gear-btn:hover,
.gear-btn[aria-expanded="true"] {
  color: var(--text);
  border-color: var(--text-muted);
}

.modified-dot {
  position: absolute;
  top: -0.15rem;
  right: -0.15rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--accent-incoming);
  border: 2px solid var(--bg);
}

.settings-panel {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  width: 15rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 0.2s ease, opacity 0.2s ease;
  pointer-events: none;
}

.settings-panel.open {
  grid-template-rows: 1fr;
  opacity: 1;
  pointer-events: auto;
}

.settings-inner {
  min-height: 0;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.settings-inner label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.settings-inner input,
.settings-inner select {
  font: inherit;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
}

.settings-inner input.invalid {
  border-color: var(--danger);
}

.field-error {
  color: var(--danger);
  font-size: 0.6875rem;
}

.reset-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.6875rem;
  color: var(--accent-incoming);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.none-note {
  margin: 0;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.field-block {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field-label {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.mobile-only-variant {
  display: none;
}

@media (max-width: 68.75rem) {
  .control-label,
  .desktop-only-variant {
    display: none;
  }

  .mobile-only-variant {
    display: flex;
  }
}
</style>
