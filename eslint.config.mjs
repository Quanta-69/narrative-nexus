import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Custom rules or overrides here
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
})
