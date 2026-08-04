import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildThemeTransitionCss } from '../dist/index.mjs';

const outputPath = fileURLToPath(new URL('../dist/style.css', import.meta.url));

await writeFile(outputPath, buildThemeTransitionCss());
