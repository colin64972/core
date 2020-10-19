const setEslint = require('@northtrend/configs/eslint')

module.exports = setEslint(false, null, null, {
  node: true,
  mocha: true
})
