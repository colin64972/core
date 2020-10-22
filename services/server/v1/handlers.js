import setHome from './templates/home.pug'
import setNotFound from './templates/notFound.pug'

export const servePageHandler = async (event, context, callback) => {
  console.log('servePageHandler', event.requestContext)

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

  let html = setNotFound(locals.notFound)

  if (event.requestContext.http.path === '/') {
    html = setHome(locals.home)
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'text/html'
    },
    body: html
  }
}
