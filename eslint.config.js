import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import security from 'eslint-plugin-security';
import unicorn from 'eslint-plugin-unicorn';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
        parser,
        parserOptions: {
            project: './tsconfig.json', // Fichier tsconfig.json pour les informations de type
            tsconfigRootDir: process.cwd(),
            sourceType: 'module',
          },
      },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      jsdoc,
      prettier,
      sonarjs,
      security,
      unicorn,
      import: importPlugin,
    },
    rules: {
      // TypeScript Rules
      ...typescriptPlugin.configs.recommended.rules,
      ...typescriptPlugin.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      // Import Rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@nestjs/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@app/**',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/newline-after-import': 'error',
      quotes: ['error', 'single'],
      // Prettier Rules
      'prettier/prettier': ['error', { singleQuote: true }],

      // JSDoc Rules
      'jsdoc/require-param': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/check-alignment': 'error',
      //'jsdoc/require-jsdoc': 'error',

      // SonarJS Rules
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/cognitive-complexity': ['error', 5],
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/prefer-object-literal': 'error',

      // Security Rules
      'security/detect-non-literal-fs-filename': 'off',

      // Unicorn Rules
      'unicorn/no-array-for-each': 'warn',
      'unicorn/no-for-loop': 'error',
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-string-replace-all': 'warn',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/no-array-push-push': 'warn',
      'unicorn/prefer-optional-catch-binding': 'warn',
    },
  },

  {
    ignores: ['dist', 'node_modules'],
  },
];