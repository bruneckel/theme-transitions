<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { defaultThemeEffects } from "@bruneckel/theme-transitions-core";
import type { ThemeEffect } from "@bruneckel/theme-transitions-core";
import IconChevronRight from "./icons/IconChevronRight.vue";
import IconRotateCcw from "./icons/IconRotateCcw.vue";

export interface EffectOptions {
  variant: ThemeEffect;
  duration: string;
  easing: string;
  radius: string;
}

const options = defineModel<EffectOptions>({ required: true });
const valid = defineModel<boolean>("valid", { required: true });

const isOpen = ref(false);

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
  return match
    ? { value: Number(match[1]), unit: match[2] }
    : { value: 150, unit: "vmax" };
};

const defaultRadius = parseRadius(defaultThemeEffects.spread.radius);

const variant = ref<ThemeEffect>(options.value.variant);
const duration = ref(options.value.duration);
const easingPreset = ref(defaultThemeEffects.spread.easing);
const customEasing = ref("");
const radiusValue = ref(defaultRadius.value);
const radiusUnit = ref(defaultRadius.unit);

const easing = computed(() =>
  easingPreset.value === "custom" ? customEasing.value : easingPreset.value,
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

const isModified = computed(() => {
  if (variant.value === "none") return false;

  const defaults =
    variant.value === "fade"
      ? defaultThemeEffects.fade
      : defaultThemeEffects.spread;

  if (
    duration.value !== defaults.duration ||
    easing.value !== defaults.easing
  ) {
    return true;
  }

  return (
    variant.value === "spread" &&
    radius.value !== defaultThemeEffects.spread.radius
  );
});

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

watch(
  [variant, duration, easing, radius],
  () => {
    options.value = {
      variant: variant.value,
      duration: duration.value,
      easing: easing.value,
      radius: radius.value,
    };
  },
  { immediate: true },
);

watch(
  [durationError, easingError, radiusError],
  ([durationErr, easingErr, radiusErr]) => {
    valid.value = !durationErr && !easingErr && !radiusErr;
  },
  { immediate: true },
);
</script>

<template>
  <div class="settings">
    <div class="settings-header">
      <button
        type="button"
        class="settings-toggle"
        :aria-expanded="isOpen"
        aria-controls="settings-panel"
        @click="isOpen = !isOpen"
      >
        <IconChevronRight
          class="chevron"
          :class="{ open: isOpen }"
          :size="14"
        />
        Settings
      </button>

      <button
        v-if="isModified"
        type="button"
        class="reset"
        aria-label="Reset to defaults"
        title="Reset to defaults"
        @click="resetToDefaults"
      >
        <IconRotateCcw :size="14" aria-hidden="true" />
      </button>
    </div>

    <div
      id="settings-panel"
      class="settings-collapse"
      :class="{ open: isOpen }"
    >
      <div class="settings-collapse-inner">
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
              <input
                v-model="duration"
                type="text"
                placeholder="1s"
                :class="{ invalid: durationError }"
              />
              <span v-if="durationError" class="error">{{
                durationError
              }}</span>
            </label>

            <label>
              <span class="label-text">Easing</span>
              <select v-model="easingPreset">
                <option
                  v-for="preset in easingPresets"
                  :key="preset"
                  :value="preset"
                >
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
                <input
                  v-model.number="radiusValue"
                  type="number"
                  min="0"
                  :class="{ invalid: radiusError }"
                />
                <select v-model="radiusUnit">
                  <option v-for="unit in radiusUnits" :key="unit" :value="unit">
                    {{ unit }}
                  </option>
                </select>
              </span>
              <span v-if="radiusError" class="error">{{ radiusError }}</span>
            </label>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
}

.settings-header {
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
}

.settings-toggle {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font: inherit;
  cursor: pointer;
  padding: 0.6rem 0.9rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
  background: none;
  border: none;
  border-radius: inherit;
  text-align: left;
}

.chevron {
  transition: transform 0.2s ease;
}

.chevron.open {
  transform: rotate(90deg);
}

.settings-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.settings-collapse.open {
  grid-template-rows: 1fr;
  border-top: 1px solid var(--border);
}

.settings-collapse-inner {
  min-height: 0;
  overflow: hidden;
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
  outline: 2px solid var(--text);
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--danger);
  background: none;
  border: none;
  border-radius: 0.5rem;
  padding: 0.4rem;
  cursor: pointer;
  transition: background-color 0.15s;
}

.reset:hover {
  background: var(--border);
}
</style>
