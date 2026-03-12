import { dirname, relative, resolve } from 'path';
import type { Plugin } from 'vite';

export const tailwindReferenceInjector = (): Plugin => ({
  name: 'tailwind-reference-injector',
  enforce: 'pre',
  transform(code: string, id: string) {
    const [filePath] = id.split('?');
    const stylesEntryPath = resolve(__dirname, '../src/styles.css');

    if (!filePath.endsWith('.module.css')) {
      return null;
    }

    if (filePath === stylesEntryPath) {
      return null;
    }

    if (code.includes('@reference ')) {
      return null;
    }

    const relativeStylesPath = relative(
      dirname(filePath),
      stylesEntryPath,
    ).replace(/\\/g, '/');
    const referencePath = relativeStylesPath.startsWith('.')
      ? relativeStylesPath
      : `./${relativeStylesPath}`;

    return {
      code: `@reference '${referencePath}';\n\n${code}`,
      map: null,
    };
  },
});
