---
"@brustack/theme-transitions-core": major
---

Namespace the localStorage key from `theme` to `tt:theme`, to avoid colliding with other libraries or app code using the same generic key. Anyone upgrading loses their previously saved preference once (falls back to `system`); this also lays the groundwork for supporting themes beyond light/dark.
