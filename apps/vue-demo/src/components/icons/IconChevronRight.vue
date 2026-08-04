<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{ size?: number }>();
</script>

<template>
  <BaseIcon :size="size">
    <path d="m9 18 6-6-6-6" />
  </BaseIcon>
</template>
