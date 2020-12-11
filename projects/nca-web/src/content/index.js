require('colors')
const fs = require('fs')
const path = require('path')
const { navItems } = require('./navItems')
const { footer } = require('./footer')
const { home } = require('./home')
const { contact } = require('./contact')
const { resume } = require('./resume')
const { apps } = require('./apps')
const { error } = require('./error')

contentToJson('content')

function contentToJson(filename) {
  const data = {
    navItems,
    footer,
    home,
    resume,
    apps,
    contact,
    error
  }

  const outputLocation = path.resolve('distContent')

  if (!fs.existsSync(outputLocation)) {
    fs.mkdirSync(outputLocation)
  }

  fs.writeFileSync(
    `${outputLocation}/${filename}.json`,
    JSON.stringify(data, null, 2)
  )
}
