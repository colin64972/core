const setEslint = require('@colin30/configs/eslint')

module.exports = setEslint(
  true,
  ['eslint:recommended', 'plugin:react/recommended'],
  ['react'],
  {
    browser: true,
    jest: true
  }
)
