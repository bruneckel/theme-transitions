<script setup lang="ts">
import IconJs from "./icons/IconJs.vue";
import IconNext from "./icons/IconNext.vue";
import IconNuxt from "./icons/IconNuxt.vue";
import IconReact from "./icons/IconReact.vue";
import IconVue from "./icons/IconVue.vue";
</script>

<template>
  <div class="frameworks" @click.stop>
    <a
      href="https://www.npmjs.com/package/@brustack/vue-theme-transitions"
      target="_blank"
      rel="noopener"
    >
      <IconVue />
      Vue
    </a>
    <a
      href="https://www.npmjs.com/package/@brustack/react-theme-transitions"
      target="_blank"
      rel="noopener"
    >
      <IconReact />
      React
    </a>
    <a
      href="https://www.npmjs.com/package/@brustack/nuxt-theme-transitions"
      target="_blank"
      rel="noopener"
    >
      <IconNuxt />
      Nuxt
    </a>
    <a
      href="https://www.npmjs.com/package/@brustack/next-theme-transitions"
      target="_blank"
      rel="noopener"
    >
      <IconNext />
      Next
    </a>
    <a
      href="https://www.npmjs.com/package/@brustack/theme-transitions-core"
      target="_blank"
      rel="noopener"
    >
      <IconJs />
      Vanilla
    </a>
  </div>
</template>

<style scoped>
.frameworks {
  margin-top: 1.75rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.frameworks a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-decoration: none;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  transition: border-color 0.15s, color 0.15s;
}

.frameworks a:hover {
  border-color: var(--text-muted);
  color: var(--text);
}

.frameworks a:focus-visible {
  outline: 2px solid var(--accent-incoming);
  outline-offset: 2px;
}
</style>
