<script setup lang="ts">
import type {
  ThemeMode,
  ThemeName,
  ThemeOrigin,
} from "@brustack/theme-transitions-core";
import Wordmark from "./Wordmark.vue";
import ModePicker from "./ModePicker.vue";
import EffectPicker, { type EffectOptions } from "./EffectPicker.vue";

defineProps<{
  mode: ThemeName;
  theme: ThemeName;
}>();

const effectOptions = defineModel<EffectOptions>("effectOptions", {
  required: true,
});

defineEmits<{
  selectMode: [mode: ThemeMode, origin: ThemeOrigin | null];
}>();
</script>

<template>
  <div class="topbar">
    <Wordmark />
    <div class="controls" @click.stop>
      <ModePicker
        :mode="mode"
        :theme="theme"
        @select="(m, origin) => $emit('selectMode', m, origin)"
      />
      <EffectPicker v-model="effectOptions" />
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.75rem;
  flex-wrap: wrap;
  gap: 0.75rem;
  position: relative;
  z-index: 2;
}

.controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.75rem 1rem;
  position: relative;
  z-index: 2;
}

@media (max-width: 68.75rem) {
  .topbar {
    justify-content: center;
    text-align: center;
  }

  .controls {
    justify-content: center;
    width: 100%;
  }
}
</style>
