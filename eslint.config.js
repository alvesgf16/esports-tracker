const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const unicorn = require('eslint-plugin-unicorn').default;
const jestPlugin = require('eslint-plugin-jest');
const exportRules = require('./eslint-rules/exports');
const typesRules = require('./eslint-rules/types');

const specFiles = ['**/*.{spec,test}.{ts,tsx,js,jsx}'];

const testFiles = [
  ...specFiles,
  '**/*.harness.{ts,tsx}',
  '**/__tests__/**/*.{ts,tsx,js,jsx}',
];

const siblingFeatures = {
  group: ['@/modules/features/*', '@/modules/features/*/**'],
  message:
    'Features must not import each other; put shared code in modules/shared.',
};

const allFeatures = {
  group: ['@/modules/features', '@/modules/features/**'],
  message:
    'Features must not import each other; put shared code in modules/shared.',
};

const dataLayer = {
  group: ['@/data', '@/data/*', '@/data/**'],
  message:
    'Feature and shared tests fake gateway ports; they must not import data/.',
};

function presenterImports() {
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
        group: ['@/lib', '@/lib/*', '@/lib/**'],
        message:
          'Builders own lib/; inject the board and scheduleClock into the Presenter.',
      },
      {
        group: ['@/app', '@/app/*', '@/data', '@/data/*', '@/data/**'],
        message:
          'Presenters use entities, gateways, and use cases; Builders inject data/.',
      },
      siblingFeatures,
    ],
  };
}

function useCaseImports(featureBan) {
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
          '@/data/**',
          '@/constants',
          '@/constants/*',
          '@/lib',
          '@/lib/*',
          '@/lib/**',
        ],
        message:
          'Use cases take entities as input; view-model mapping lives in mappers/.',
      },
      featureBan,
    ],
  };
}

function mapperImports(featureBan) {
  return {
    paths: [
      {
        name: 'expo-router',
        message: 'Mappers must not import Expo Router.',
      },
      {
        name: 'react-native',
        message: 'Mappers must not import React Native.',
      },
    ],
    patterns: [
      {
        group: [
          '@/app',
          '@/app/*',
          '@/data',
          '@/data/*',
          '@/data/**',
          '@/constants',
          '@/constants/*',
          '@/lib',
          '@/lib/*',
          '@/lib/**',
        ],
        message: 'Mappers map entities and gateway state into view models.',
      },
      featureBan,
    ],
  };
}

function routerImports() {
  return {
    paths: [
      {
        name: 'react-native',
        message: 'Routers must not import React Native.',
      },
    ],
    patterns: [
      {
        group: [
          '@/app',
          '@/app/*',
          '@/data',
          '@/data/*',
          '@/data/**',
          '@/constants',
          '@/constants/*',
        ],
        message:
          'Routers adapt Expo Router; they must not import app/ or data/.',
      },
      siblingFeatures,
    ],
  };
}

function viewImports(featureBan) {
  return {
    paths: [
      {
        name: 'expo-router',
        message: 'Views must not import Expo Router; use the feature Router.',
      },
    ],
    patterns: [
      {
        group: ['@/data', '@/data/*', '@/data/**', '@/app', '@/app/*'],
        message:
          'Views render view models only; no data queries or app routes.',
      },
      featureBan,
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
    'expo-types.d.ts',
    'eslint.config.js',
    'commitlint.config.js',
    'eslint-rules/*',
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
    files: ['data/sources/pandascore/vendor-types.ts'],
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
      exports: exportRules,
      types: typesRules,
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
      'exports/max-value-exports': 'error',
      'exports/no-mixed-exports': 'error',
      'exports/no-barrel': 'error',
      'types/no-inline-utility-types': 'error',
      'types/no-inline-object-types': 'error',

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
      'exports/max-value-exports': 'off',
      'exports/no-mixed-exports': 'off',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
    },
  },
  {
    files: specFiles,
    rules: {
      // AAA blocks own vertical blanks; harnesses keep production padding.
      'padding-line-between-statements': 'off',
    },
  },
  {
    files: [
      'modules/shared/entities.ts',
      'modules/shared/gateways.ts',
      'modules/features/*/contracts.ts',
      'data/sources/live/schedule-result.ts',
      'data/sources/pandascore/schedule-board.ts',
      'data/sources/pandascore/vendor-types.ts',
    ],
    rules: {
      'exports/max-value-exports': ['error', { max: 0 }],
    },
  },
  {
    files: ['app/_layout.tsx'],
    rules: {
      // Expo Router: ErrorBoundary, unstable_settings, and the default layout.
      'exports/max-value-exports': ['error', { max: 3 }],
    },
  },
  {
    files: ['data/sources/sample/catalogs/matches/index.ts'],
    rules: {
      // Sample match catalog owns the folder; not a re-export barrel.
      'exports/no-barrel': 'off',
    },
  },
  // VIPER + Clean Architecture — Clean Code Ch.8 / Ch.11
  {
    files: ['modules/features/*/presenter.ts'],
    rules: {
      'no-restricted-imports': ['error', presenterImports()],
    },
  },
  {
    files: ['modules/features/*/mappers/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', mapperImports(siblingFeatures)],
    },
  },
  {
    files: ['modules/features/*/router.ts'],
    rules: {
      'no-restricted-imports': ['error', routerImports()],
    },
  },
  {
    files: ['modules/features/*/use-cases/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', useCaseImports(siblingFeatures)],
    },
  },
  {
    files: ['modules/shared/use-cases/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', useCaseImports(allFeatures)],
    },
  },
  {
    files: ['modules/shared/mappers/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', mapperImports(allFeatures)],
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
                '@/data/**',
                '@/lib',
                '@/lib/*',
                '@/lib/**',
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
    files: ['lib/clock/calendar-day.ts', 'lib/clock/schedule-clock.ts'],
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
                '@/data/**',
                '@/modules',
                '@/modules/*',
                '@/modules/**',
              ],
              message: 'Clock helpers must stay free of modules and data/.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['lib/clock/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/lib/board', '@/lib/board/*', '@/lib/board/**'],
              message: 'lib/clock must not import lib/board.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['lib/board/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/lib/clock', '@/lib/clock/*', '@/lib/clock/**'],
              message: 'lib/board must not import lib/clock.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['modules/features/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', viewImports(siblingFeatures)],
    },
  },
  {
    files: ['modules/shared/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', viewImports(allFeatures)],
    },
  },
  {
    files: ['modules/features/*/contracts.ts'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [siblingFeatures] }],
    },
  },
  {
    files: [
      'modules/features/**/*.test.{ts,tsx}',
      'modules/features/**/*.harness.ts',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [siblingFeatures, dataLayer] },
      ],
    },
  },
  {
    files: [
      'modules/shared/**/*.test.{ts,tsx}',
      'modules/shared/**/*.harness.ts',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [allFeatures, dataLayer] },
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
                '@/lib/**',
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
