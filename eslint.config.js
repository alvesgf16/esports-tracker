const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const unicorn = require('eslint-plugin-unicorn').default;
const jestPlugin = require('eslint-plugin-jest');

const testFiles = [
  '**/*.{spec,test}.{ts,tsx,js,jsx}',
  '**/*.harness.{ts,tsx}',
  '**/__tests__/**/*.{ts,tsx,js,jsx}',
];

module.exports = defineConfig([
  expoConfig,
  globalIgnores([
    'dist/*',
    '.expo/*',
    'ios/*',
    'android/*',
    'web-build/*',
    'coverage/*',
    '**/uniwind-types.d.ts',
  ]),
  {
    // eslint-plugin-import otherwise loads the `typescript` package as a resolver
    settings: {
      'import/resolver': {
        [require.resolve('eslint-import-resolver-typescript')]: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    plugins: {
      unicorn,
    },
    rules: {
      // Clean Code Ch.2
      'id-length': ['error', { min: 2, exceptions: ['_', 'x', 'y', 'i', 'j'] }],
      'id-denylist': ['error', 'l', 'O', 'I', 'cb', 'err'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          filter: { regex: '^unstable_', match: false },
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
          filter: { regex: '^unstable_', match: true },
        },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
        { selector: 'objectLiteralProperty', format: null },
        {
          selector: 'typeProperty',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
      ],

      // Clean Code Ch.3
      complexity: ['error', 5],
      'max-depth': ['error', 2],
      'max-params': ['error', 3],
      'max-lines-per-function': [
        'error',
        { max: 20, skipBlankLines: true, skipComments: true },
      ],

      // Clean Code Ch.4
      'no-warning-comments': [
        'error',
        { terms: ['fixme', 'xxx', 'hack'], location: 'start' },
      ],

      // Clean Code Ch.7
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',
      '@typescript-eslint/only-throw-error': 'error',

      // Clean Code Ch.10
      'max-classes-per-file': ['error', 1],
      'max-lines': [
        'error',
        { max: 100, skipBlankLines: true, skipComments: true },
      ],

      // Clean Code Ch.13
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',

      // Clean Code Ch.17 (MIT unicorn; not sonarjs)
      'unicorn/no-nested-ternary': 'error',
      'unicorn/no-lonely-if': 'error',
      'unicorn/prefer-array-find': 'error',
    },
  },
  {
    files: testFiles,
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      // Clean Code Ch.9 — dual standard: relax size/complexity on specs
      complexity: 'off',
      'max-depth': 'off',
      'max-params': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      'max-classes-per-file': 'off',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
    },
  },
  // VIPER layer map — Clean Code Ch.8 / Ch.11
  {
    files: ['modules/**/presenter.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'expo-router',
              message: 'Presenters must not import Expo Router.',
            },
            {
              name: 'react-native',
              message: 'Presenters must not import React Native.',
            },
          ],
          patterns: [
            {
              group: ['@/app', '@/app/*'],
              message: 'Presenters must not import app routes.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['modules/**/interactor.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'expo-router',
              message: 'Interactors must not import Expo Router.',
            },
            {
              name: 'react-native',
              message: 'Interactors must not import React Native.',
            },
          ],
          patterns: [
            {
              group: ['@/app', '@/app/*', '@/constants', '@/constants/*'],
              message: 'Interactors talk to data/entities only.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['modules/**/helpers/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'expo-router',
              message: 'Module helpers must not import Expo Router.',
            },
            {
              name: 'react-native',
              message: 'Module helpers must not import React Native.',
            },
          ],
          patterns: [
            {
              group: ['@/app', '@/app/*'],
              message: 'Module helpers must not import app routes.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['modules/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'expo-router',
              message: 'Views must not import Expo Router; use Router adapters in app/.',
            },
          ],
          patterns: [
            {
              group: [
                '@/data/games',
                '@/data/matches',
                '@/data/matches-*',
                '@/data/sample-kickoff',
                '@/app',
                '@/app/*',
              ],
              message: 'Views render view models only; no data queries or app routes.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['data/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'expo-router',
              message: 'Entities must not import Expo Router.',
            },
            {
              name: 'react-native',
              message: 'Entities must not import React Native.',
            },
          ],
          patterns: [
            {
              group: [
                '@/app',
                '@/app/*',
                '@/modules',
                '@/modules/*',
                '@/constants',
                '@/constants/*',
                '@/lib',
                '@/lib/*',
              ],
              message: 'data/ is the Entity layer; it must not import UI or modules.',
            },
          ],
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]);
