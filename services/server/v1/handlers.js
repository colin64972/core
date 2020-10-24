import Root from './templates/root.pug'
import NotFound from './templates/notFound.pug'
import { renderAppPage } from './apps'
import {
  parsePathRequest,
  findMatchingApp
} from '@cjo3/shared/serverless/helpers'

const serveRootPage = path => {
  const shared = {
    iconSrc: `${process.env.CDN_URL}/favicon.ico`,
    styleSrc: `${process.env.CDN_URL}/style.css`
  }

  const locals = {
    home: {
      ...shared,
      title: process.env.HOME_TITLE,
      logoSrc: `${process.env.CDN_URL}/logo.svg`
    },
    notFound: {
      ...shared,
      title: 'Error :('
    }
  }

  let html = NotFound(locals.notFound)

  if (path.length < 2) {
    html = Root(locals.home)
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    body: html
  }
}

export const rootHandler = async (event, context, callback) =>
  serveRootPage(event.requestContext.http.path)

export const appsHandler = async (event, context, callback) => {
  const { path } = event.requestContext.http
  if (path === '/apps') return serveRootPage(path)
  const { requestedApp, requestedPath } = parsePathRequest(path)
  if (!findMatchingApp(requestedApp, process.env.APPS_LIST))
    return serveRootPage(path)
  const html = await renderAppPage(requestedApp, requestedPath)
  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    body: html
  }
}
