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

const pages = [home, resume, apps, contact, error]

const app = sharedEnv.parsed.APPS_LIST.split(',')[0]

pages.forEach(page => pageToJson(app, page))

function pageToJson(app, page) {
  const data = {
    app,
    path: page.path,
    content: page.content
  }

  const outputLocation = path.resolve('distContent')

  if (!fs.existsSync(outputLocation)) {
    fs.mkdirSync(outputLocation)
  }

  fs.writeFileSync(
    `${outputLocation}/nca-${page.filename}.json`,
    JSON.stringify(data, null, 2)
  )
}
