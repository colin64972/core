const setEslint = require('@northtrend/configs/eslint')

module.exports = setEslint(
  true,
  ['plugin:react/recommended'],
  ['react'],
  {
    node: true,
    browser: true,
    jest: true
  },
  [{ 'react/display-name': [false, { ignoreTranspilerName: true }] }]
)
