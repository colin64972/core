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
