module.exports = setEslint = (
  ecmaFeaturesJsx = false,
  customExts = [],
  customPlugs = [],
  customEnvs = {},
  customRules = []
) => ({
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: ecmaFeaturesJsx
    }
  },
  extends: [...customExts, 'eslint:recommended', 'prettier'],
  plugins: [...customPlugs, 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    ...customRules
  },
  env: {
    es2020: true,
    ...customEnvs
  }
})
