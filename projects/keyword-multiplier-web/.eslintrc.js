// const setEslint = require('@cjo3/configs/eslint')

// module.exports = setEslint(
//   true,
//   ['plugin:react/recommended', 'plugin/react-hooks/recommended'],
//   ['react'],
//   {
//     node: true,
//     browser: true,
//     jest: true
//   },
//   [{ 'react/display-name': [false, { ignoreTranspilerName: true }] }]
// )

const setEslint = require('@cjo3/configs/eslint')

module.exports = setEslint(true, ['plugin:react/recommended'], ['react'], {
  node: true,
  browser: true,
  jest: true
})
