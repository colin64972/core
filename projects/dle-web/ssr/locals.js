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
    title: process.env.APP_NAME,
    canonical: `${process.env.SITE_URL}${process.env.APP_ROOT_PATH}/`,
    metaDescription: `Save time and reduce errors with ${process.env.APP_NAME}! Ideal for preparing spreadsheet results from labs like ALS, SGS, and Alex Stewart International.`,
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref,
    bundles
  },
  '/converter': {
    fileName: 'home-converter',
    title: `Converter | ${process.env.APP_NAME}`,
    canonical: `${process.env.SITE_URL}${process.env.APP_ROOT_PATH}/converter/`,
    metaDescription:
      'Start converting detection limit text values into actionable number values in seconds with this easy-to-use, browser-based conversion tool.',
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref,
    bundles
  },
  '/converter/guide': {
    fileName: 'home-converter-guide',
    title: `Converter Guide | ${process.env.APP_NAME}`,
    canonical: `${process.env.SITE_URL}/${process.env.APP_ROOT_PATH}/converter/guide/`,
    metaDescription: `A practical guide to using the ${process.env.APP_NAME} convert for speedy preparation of raw, analytical spreadsheet data.`,
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref,
    bundles
  },
  '/error': {
    fileName: 'error',
    title: `Error | ${process.env.APP_NAME}`,
    canonical: `${process.env.SITE_URL}/${process.env.APP_ROOT_PATH}/error.html`,
    metaDescription: metaDescriptions.error,
    robots: robotsDirectives.error,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref,
    bundles
  }
}

module.exports = {
  paths: ['/', '/converter', '/converter/guide', '/error'],
  locals
}
