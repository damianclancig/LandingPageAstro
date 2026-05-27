import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['.astro/**', '.vercel/**', 'dist/**'],
  },
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{astro,ts,tsx,js,jsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      'jsx-a11y/alt-text': 'warn',
    },
  },
];
