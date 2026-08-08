import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { buildColorModeInitScript } from '../dist/index.mjs';

const outputPath = fileURLToPath(new URL('../dist/theme-init.js', import.meta.url));

await writeFile(outputPath, buildColorModeInitScript());
