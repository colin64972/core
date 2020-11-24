require('dotenv').config()
const path = require('path')

const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

const metaDescriptions = {
  error: 'Sorry, something went wrong. Please try again later!'
}

const robotsDirectives = {
  default: 'index,follow',
  error: 'noindex,follow'
}

const faviconHref = `${process.env.CDN_URL}/favicon.ico`
const bundles = [
  `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/src.js`,
  `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/vendors~src.js`
]

const locals = {
  '/': {
    fileName: 'home',
    title: `${process.env.APP_NAME} for Online Marketing`,
    canonical: `${process.env.SITE_URL}${process.env.APP_ROOT_PATH}/`,
    metaDescription:
      'Easily combine keywords to find new targeting opportunities, look up keyword search metrics, and search for keyword-driven domain names.',
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref,
    bundles
  },
  '/error': {
    fileName: 'error',
    title: `Error | ${process.env.APP_NAME}`,
    canonical: `${process.env.SITE_URL}${process.env.APP_ROOT_PATH}/error.html`,
    metaDescription: metaDescriptions.error,
    robots: robotsDirectives.error,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref,
    bundles
  }
}

module.exports = {
  paths: ['/', '/error'],
  locals
}
