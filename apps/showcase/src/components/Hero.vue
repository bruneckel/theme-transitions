<script setup lang="ts">
import FrameworkBadges from "./FrameworkBadges.vue";
</script>

<template>
  <main>
    <p class="eyebrow">
      View Transitions API &middot; Spread &amp; Fade Effects
    </p>
    <h1>Click <em>anywhere</em>.</h1>
    <p class="sub">
      The transition follows your cursor, powered by the View Transitions API.
    </p>
    <FrameworkBadges />
  </main>
</template>

<style scoped>
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  position: relative;
  z-index: 1;
}

.eyebrow {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 1rem;
}

h1 {
  font-family: "Fraunces", ui-serif, Georgia, serif;
  font-weight: 900;
  font-size: clamp(2.75rem, 8vw, 5.5rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  margin: 0;
  text-wrap: balance;
}

h1 em {
  font-family: "Fraunces", ui-serif, Georgia, serif;
  font-weight: 400;
  font-style: italic;
  color: var(--accent-incoming);
  transition: color 0.4s;
}

.sub {
  margin: 1rem 0 0;
  max-width: 34ch;
  font-size: 1.0625rem;
  color: var(--text-muted);
  text-wrap: balance;
}
</style>
