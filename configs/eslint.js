module.exports = setEslint = (
  jsx = false,
  customExts = [],
  customPlugs = [],
  customEnvs = {}
) => ({
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx
    }
  },
  extends: [...customExts, 'prettier'],
  plugins: [...customPlugs, 'prettier'],
  rules: {
    'prettier/prettier': ['error']
  },
  env: {
    es2020: true,
    ...customEnvs
  }
})
