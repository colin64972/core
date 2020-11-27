require('dotenv').config()
const path = require('path')
const sheetGenerator = require('../styles/sheetGenerator')
const global = require('../styles/global')

const styles = {
  ...global,
  body: {
    ...global.body,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    'width': '50%',
    'maxWidth': 300,
    '@media screen and (max-width: 600px)': {
      width: '75%'
    }
  }
}

const styleSheet = sheetGenerator(styles)

const cdnUrl = `https://${process.env.CDN_BUCKET}`

module.exports = {
  fileName: 'index.html',
  templatePath: path.resolve('src', 'templates', 'home.pug'),
  locals: {
    title: process.env.BRAND_NAME,
    canonical: `${cdnUrl}/`,
    metaDescription:
      'Online marketing solutions including JavaScript web app design and development',
    robots: 'index,follow',
    faviconHref: `${cdnUrl}/favicon.ico`,
    gsvCode: process.env.GSV_TAG,
    gaTag: process.env.GA_TAG,
    logoSrc: `${cdnUrl}/logo.svg`,
    styleSheet
  }
}
