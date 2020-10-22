import Root from './templates/root.pug'
import NotFound from './templates/notFound.pug'
import { serveAppPage } from './apps'

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
  if (path.length < 7) return serveRootPage(path)
  const requestedApp = path.replace(/\/apps\/(.*)$/i, '$1')
  return serveAppPage(requestedApp)
}
