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

const faviconHref = `${process.env.CDN_URL_PRO}/favicon.ico`

exports.locals = {
  '/': {
    fileName: 'home',
    title: 'hello world',
    canonical: '/',
    metaDescription: 'asdf',
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref
  }
}
