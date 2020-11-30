module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['@typescript-eslint', 'prettier', 'react'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    'prettier/prettier': 'error'
  }
}
