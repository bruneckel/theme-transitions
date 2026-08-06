<template>
  <a
    class="wordmark"
    href="https://github.com/brustack/theme-transitions"
    target="_blank"
    rel="noopener"
    @click.stop
  >
    <svg
      class="logo-mark"
      viewBox="0 0 226.77 226.77"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon
        points="153.73 83.39 153.73 153.73 83.39 153.73 83.39 213.73 213.73 213.73 213.73 83.39 153.73 83.39"
      />
      <rect x="83.39" y="13.04" width="60" height="60" />
      <rect x="13.04" y="83.39" width="60" height="60" />
      <rect x="83.39" y="83.39" width="60" height="60" />
    </svg>
    <strong>BruStack</strong><span class="sep">/</span>theme-transitions
  </a>
</template>

<style scoped>
.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.8125rem;
  color: var(--text-muted);
  text-decoration: none;
  letter-spacing: 0.01em;
}

.logo-mark {
  color: var(--text);
  flex-shrink: 0;
}

.wordmark strong {
  color: var(--text);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.wordmark .sep {
  opacity: 0.5;
  padding: 0 0.05rem;
}
</style>
