require('colors')
const jss = require('jss').default
const preset = require('jss-preset-default').default
const global = require('jss-plugin-global').default

const createGenerateId = () => (rule, sheet) => rule.key

jss.setup({
  ...preset(),
  createGenerateId
})

jss.use(global())

const sheetGenerator = styles => {
  const sheet = jss.createStyleSheet(styles)
  return sheet.toString()
}

module.exports = sheetGenerator
