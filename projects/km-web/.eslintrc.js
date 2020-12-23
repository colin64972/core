const setEslint = require('@cjo3/configs/eslint')

module.exports = setEslint(true, ['plugin:react/recommended'], ['react'], {
  node: true,
  browser: true,
  jest: true
})
