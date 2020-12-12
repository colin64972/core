require('dotenv').config()

const path = require('path')

const sharedEnv = require('dotenv').config({
  path: path.resolve('..', 'shared', '.env')
})

const robotsDirectives = {
  default: 'index,follow',
  error: 'noindex,follow'
}

const faviconHref = `${process.env.CDN_URL_PRO}/favicon.ico`

exports.locals = {
  '/': {
    fileName: 'home',
    title: `JavaScript App Design & Development by Colin ${process.env.APP_NAME}`,
    canonical: `${process.env.CDN_URL_PRO}/`,
    metaDescription: `Resume and portfolio site of full stack JavaScript app developer Colin ${process.env.APP_NAME}`,
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref
  },
  '/resume': {
    fileName: 'resume',
    title: 'JavaScript Developer Resume',
    canonical: `${process.env.CDN_URL_PRO}/resume/`,
    metaDescription: 'Learn more about my JavaScript skills and credentials',
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref
  },
  '/apps': {
    fileName: 'apps',
    title: 'JavaScript App Portfolio with Code Samples',
    canonical: `${process.env.CDN_URL_PRO}/apps/`,
    metaDescription:
      'Take a look at some of my recent apps built with JavaScript and NodeJs',
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref
  },
  '/contact': {
    fileName: 'contact',
    title: 'Send Me a Message!',
    canonical: `${process.env.CDN_URL_PRO}/contact/`,
    metaDescription:
      'Feel free to send me a message here if you have any questions or feedback!',
    robots: robotsDirectives.default,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref
  },
  '/error': {
    fileName: 'error',
    title: 'Not Found',
    canonical: `${process.env.CDN_URL_PRO}/error.html`,
    metaDescription: `Oops, nothing to see here. Please visit my homepage at ${process.env.CDN_URL_PRO}/`,
    robots: robotsDirectives.error,
    gsvCode: sharedEnv.parsed.GSV_TAG,
    gaTag: sharedEnv.parsed.GA_TAG,
    faviconHref
  }
}
