<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{ size?: number }>();
</script>

<template>
  <BaseIcon :size="size">
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </BaseIcon>
</template>
