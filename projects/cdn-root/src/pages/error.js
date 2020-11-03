require('dotenv').config()
const path = require('path')
const sheetGenerator = require('../styles/sheetGenerator')
const global = require('../styles/global')

const styles = {
  ...global,
  body: {
    ...global.body,
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    '@media screen and (max-width: 600px)': {
      flexFlow: 'column nowrap'
    }
  },
  heading: {
    color: '#ff2211',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  message: {
    'textAlign': 'center',
    'marginLeft': '1rem',
    '@media screen and (max-width: 600px)': {
      marginLeft: 0
    }
  }
}

const styleSheet = sheetGenerator(styles)

const cdnUrl = `https://${process.env.CDN_BUCKET}`
const baseUrl = `https://${process.env.NM_BUCKET}`

module.exports = {
  fileName: 'error.html',
  templatePath: path.resolve('src', 'templates', 'error.pug'),
  locals: {
    title: `Error | ${process.env.BRAND_NAME}`,
    canonical: `${baseUrl}/error.html`,
    metaDescription: 'Sorry, something went wrong. Please try again later!',
    robots: 'noindex,follow',
    faviconHref: `${cdnUrl}/favicon.ico`,
    gsvCode: process.env.GSV_TAG,
    gaTag: process.env.GA_TAG,
    heading: 'Error',
    message: 'Sorry, something went wrong',
    styleSheet
  }
}
