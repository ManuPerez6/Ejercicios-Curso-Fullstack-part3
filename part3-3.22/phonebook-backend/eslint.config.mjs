// eslint.config.js
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin-js'
import globals from 'globals'

export default defineConfig([
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
    ],
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      }
    },
    plugins: {
      '@stylistic/js': stylistic
    },
    rules: {
      // Reglas de estilo
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0
    },
  },
])

