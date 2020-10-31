// import {
//   splitAppsList,
//   parsePathRequest,
//   switchPathPageName
// } from '@cjo3/shared/serverless/helpers'
// import { fetchPreRender, fetchRootPage } from '@cjo3/shared/fetchers/axios'

export const generateRedirect = targetUrl => ({
  status: 301,
  statusDescription: 'redirect to non-www',
  headers: {
    'location': [
      {
        key: 'location',
        value: targetUrl
      }
    ],
    'strict-transport-security': [
      {
        key: 'strict-transport-security',
        value: 'max-age=1'
      }
    ]
  }
})

// export const getPreRender = async (uri, appsList) => {
//   try {
//     let appFolder, pageName
//     const appsUri = uri.substring(uri.indexOf('/apps'))
//     const { requestedApp, requestedPath } = parsePathRequest(appsUri)
//     const apps = splitAppsList(appsList)
//     if (!apps.includes(requestedApp)) throw new Error('no such app')
//     appFolder = requestedApp
//     pageName = switchPathPageName(requestedPath)
//     return await fetchPreRender(appFolder, pageName)
//   } catch (error) {
//     throw error
//   }
// }

export const buildHtmlRes = markup => ({
  status: 200,
  statusDescription: 'ok',
  headers: {
    'cache-control': [
      {
        key: 'cache-control',
        value: 'max-age=100'
      }
    ],
    'content-type': [
      {
        key: 'content-type',
        value: 'text/html'
      }
    ]
  },
  body: markup
})
