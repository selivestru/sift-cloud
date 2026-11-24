import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    semi: false,
    singleQuote: true,
    jsxSingleQuote: false,
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    arrowParens: 'always',
    bracketSpacing: true,
    bracketSameLine: false,
    quoteProps: 'as-needed',
    endOfLine: 'lf',
    sortImports: true,
    sortPackageJson: true,
    overrides: [
      {
        files: ['apps/app/**'],
        options: {
          sortTailwindcss: true,
        },
      },
    ],
  },
  lint: {
    plugins: ['typescript'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
    overrides: [
      {
        files: ['apps/api/**'],
        rules: {
          'typescript/no-explicit-any': 'off',
          'typescript/no-floating-promises': 'error',
        },
        env: {
          node: true,
        },
      },
    ],
  },
  run: {
    cache: true,
  },
})
