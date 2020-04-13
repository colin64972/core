const fs = require('fs')
const yaml = require('js-yaml')

exports.getEnvValue = value => process.env[value]

exports.readYaml = filePath => {
  try {
    const contents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.safeLoadAll(contents)
    return data
  } catch (error) {
    console.error('ERROR', error)
    return process.exit()
  }
}
