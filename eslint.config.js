const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const unicorn = require('eslint-plugin-unicorn').default;
const jestPlugin = require('eslint-plugin-jest');

const testFiles = [
  '**/*.{spec,test}.{ts,tsx,js,jsx}',
  '**/*.harness.{ts,tsx}',
  '**/__tests__/**/*.{ts,tsx,js,jsx}',
];

function presenterImports(siblingFeatures) {
  return {
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
        group: ['@/app', '@/app/*', '@/data', '@/data/*'],
        message:
          'Presenters use entities, gateways, and use cases; Builders inject data/.',
      },
      {
        group: siblingFeatures,
        message:
          'Features must not import each other; put shared code in modules/shared.',
      },
    ],
  };
}

function useCaseImports(forbiddenModules) {
  return {
    paths: [
      {
        name: 'expo-router',
        message: 'Use cases must not import Expo Router.',
      },
      {
        name: 'react-native',
        message: 'Use cases must not import React Native.',
      },
    ],
    patterns: [
      {
        group: [
          '@/app',
          '@/app/*',
          '@/data',
          '@/data/*',
          '@/constants',
          '@/constants/*',
        ],
        message: 'Use cases take entities as input; they must not import data/.',
      },
      {
        group: forbiddenModules,
        message:
          'Features must not import each other; put shared code in modules/shared.',
      },
    ],
  };
}

function viewImports(siblingFeatures) {
  return {
    paths: [
      {
        name: 'expo-router',
        message: 'Views must not import Expo Router; use Router adapters in app/.',
      },
    ],
    patterns: [
      {
        group: ['@/data', '@/data/*', '@/app', '@/app/*'],
        message:
          'Views render view models only; no data queries or app routes.',
      },
      {
        group: siblingFeatures,
        message:
          'Features must not import each other; put shared code in modules/shared.',
      },
    ],
  };
}

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
    'expo-env.d.ts',
    'eslint.config.js',
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
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Clean Code Ch.2
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

      // Clean Code Ch.7
      '@typescript-eslint/only-throw-error': 'error',

      // Clean Code Ch.13
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',
    },
  },
  {
    files: ['data/pandascore/vendor-types.ts'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'typeLike', format: ['PascalCase'] },
        {
          selector: 'typeProperty',
          format: ['camelCase', 'snake_case'],
        },
      ],
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

      // Clean Code Ch.5 — vertical openness (Prettier owns horizontal)
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['if', 'for'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['if', 'for'] },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],

      // Clean Code Ch.7
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',

      // Clean Code Ch.10
      'max-classes-per-file': ['error', 1],
      'max-lines': [
        'error',
        { max: 100, skipBlankLines: true, skipComments: true },
      ],

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
  // VIPER + Clean Architecture — Clean Code Ch.8 / Ch.11
  {
    files: ['modules/features/schedule/presenter.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        presenterImports([
          '@/modules/features/games',
          '@/modules/features/games/**',
        ]),
      ],
    },
  },
  {
    files: ['modules/features/games/presenter.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        presenterImports([
          '@/modules/features/schedule',
          '@/modules/features/schedule/**',
        ]),
      ],
    },
  },
  {
    files: ['modules/features/schedule/use-cases/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        useCaseImports([
          '@/modules/features/games',
          '@/modules/features/games/**',
        ]),
      ],
    },
  },
  {
    files: ['modules/features/games/use-cases/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        useCaseImports([
          '@/modules/features/schedule',
          '@/modules/features/schedule/**',
        ]),
      ],
    },
  },
  {
    files: ['modules/shared/use-cases/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        useCaseImports(['@/modules/features', '@/modules/features/**']),
      ],
    },
  },
  {
    files: ['modules/**/entities.ts'],
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
                '@/data',
                '@/data/*',
                '@/lib',
                '@/lib/*',
                '@/constants',
                '@/constants/*',
                '@/modules/features',
                '@/modules/features/**',
              ],
              message: 'Entities are domain DTOs only.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['lib/format-time.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'expo-router',
              message: 'Clock helpers must not import Expo Router.',
            },
            {
              name: 'react-native',
              message: 'Clock helpers must not import React Native.',
            },
          ],
          patterns: [
            {
              group: [
                '@/app',
                '@/app/*',
                '@/data',
                '@/data/*',
                '@/modules',
                '@/modules/*',
                '@/modules/**',
              ],
              message: 'lib/format-time must stay free of modules and data/.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['modules/features/schedule/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        viewImports([
          '@/modules/features/games',
          '@/modules/features/games/**',
        ]),
      ],
    },
  },
  {
    files: ['modules/features/games/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        viewImports([
          '@/modules/features/schedule',
          '@/modules/features/schedule/**',
        ]),
      ],
    },
  },
  {
    files: ['modules/shared/**/*.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        viewImports(['@/modules/features', '@/modules/features/**']),
      ],
    },
  },
  {
    files: [
      'modules/features/schedule/contracts.ts',
      'modules/features/schedule/*.harness.ts',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/modules/features/games',
                '@/modules/features/games/**',
              ],
              message:
                'Features must not import each other; put shared code in modules/shared.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      'modules/features/games/contracts.ts',
      'modules/features/games/*.harness.ts',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/modules/features/schedule',
                '@/modules/features/schedule/**',
              ],
              message:
                'Features must not import each other; put shared code in modules/shared.',
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
              message: 'data/ must not import Expo Router.',
            },
            {
              name: 'react-native',
              message: 'data/ must not import React Native.',
            },
          ],
          patterns: [
            {
              group: [
                '@/app',
                '@/app/*',
                '@/constants',
                '@/constants/*',
                '@/lib',
                '@/lib/*',
                '@/modules/features',
                '@/modules/features/**',
                '@/modules/shared/components',
                '@/modules/shared/components/**',
                '@/modules/shared/use-cases',
                '@/modules/shared/use-cases/**',
                '@/modules/shared/*.harness',
              ],
              message:
                'data/ implements gateways; import entities and gateways only.',
            },
          ],
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]);
