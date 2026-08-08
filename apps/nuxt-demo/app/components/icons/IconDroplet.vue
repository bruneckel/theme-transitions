<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

defineProps<{ size?: number }>();
</script>

<template>
  <BaseIcon :size="size">
    <path d="M12 2.69 17.66 8.5a8 8 0 1 1-11.31 0z" />
  </BaseIcon>
</template>
