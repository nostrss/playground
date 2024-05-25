const { resolve } = require('node:path')
const { root } = require('./nuxt3')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project,
    extraFileExtensions: ['.vue'],
  },
  ignorePatterns: ['node_modules/**', '.eslintrc.cjs'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 120,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
      { usePrettierrc: false },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['objectLiteralProperty'],
        format: ['snake_case', 'camelCase', 'PascalCase', 'UPPER_CASE'],
        filter: {
          regex: '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
          match: false,
        },
      },
    ],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['error', 'index', 'Index', 'default'],
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: true,
      },
    ],
    'vue/attribute-hyphenation': 'error',
    'vue/no-v-html': 'off',
  },
}
