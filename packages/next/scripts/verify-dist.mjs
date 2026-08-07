import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const useThemeTransitionPath = fileURLToPath(new URL('../dist/useThemeTransition.mjs', import.meta.url));
const themeScriptPath = fileURLToPath(new URL('../dist/ThemeScript.mjs', import.meta.url));

const useThemeTransitionSource = readFileSync(useThemeTransitionPath, 'utf8');
const themeScriptSource = readFileSync(themeScriptPath, 'utf8');

if (!useThemeTransitionSource.startsWith('"use client"')) {
	throw new Error('dist/useThemeTransition.mjs is missing the "use client" directive');
}

if (themeScriptSource.includes('use client')) {
	throw new Error('dist/ThemeScript.mjs must not have a "use client" directive, it is a Server Component');
}

if (!themeScriptSource.includes('from \'react\'')) {
	throw new Error('dist/ThemeScript.mjs is missing its React import, JSX will throw "React is not defined" at runtime');
}
