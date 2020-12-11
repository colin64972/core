require('colors')
const fs = require('fs')
const path = require('path')
const { home } = require('./home')
const { contact } = require('./contact')
const { resume } = require('./resume')
const { apps } = require('./apps')
const { error } = require('./error')

const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

const component = [home, resume, apps, contact, error]

const app = sharedEnv.parsed.APPS_LIST.split(',')[0]

component.forEach(component => componentToJson(app, component))

function componentToJson(app, component) {
  const data = {
    app,
    content: component.content
  }

  const outputLocation = path.resolve('distContent')

  if (!fs.existsSync(outputLocation)) {
    fs.mkdirSync(outputLocation)
  }

  fs.writeFileSync(
    `${outputLocation}/${component.filename}.json`,
    JSON.stringify(data, null, 2)
  )
}
