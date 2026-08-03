import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildThemeTransitionCss } from '@bruneckel/theme-transitions-core';

const outputPath = fileURLToPath(new URL('../dist/style.css', import.meta.url));

await writeFile(outputPath, buildThemeTransitionCss());
