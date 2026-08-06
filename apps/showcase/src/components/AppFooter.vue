<template>
  <div class="footer-facts">
    <p class="facts-row">
      3 packages &middot; Zero dependencies &middot; TypeScript
    </p>
    <p class="credit-row">
      Live demo of
      <a
        href="https://github.com/brustack/theme-transitions"
        target="_blank"
        rel="noopener"
        @click.stop
        >brustack/theme-transitions</a
      >
      &middot;
      <a
        href="https://github.com/brustack/theme-transitions/blob/main/LICENSE"
        target="_blank"
        rel="noopener"
        @click.stop
        >MIT License</a
      >
    </p>
  </div>
</template>

<style scoped>
.footer-facts {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--border);
  padding: 1rem 1.75rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.5rem 1rem;
  z-index: 2;
}

.facts-row,
.credit-row {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0;
}

.facts-row {
  grid-column: 1;
  justify-self: start;
}

.credit-row {
  grid-column: 2;
  justify-self: center;
  white-space: nowrap;
}

.credit-row a {
  color: var(--text-muted);
}

.credit-row a:hover {
  color: var(--text);
}
</style>
