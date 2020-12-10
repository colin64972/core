import axios from 'axios'
import { addAuthHeaderToOptions } from '@cjo3/shared/security/authToken'

const otherHeaders = {
  headers: {
    accept: 'application/json'
  }
}

export async function postMessage(values, host, pathname) {
  const payload = {
    name: values.name,
    sender: values.email,
    typeIndex: values.messageType,
    message: values.message
  }

  const res = await axios.post(
    'http://localhost:2000/contact',
    {
      ...payload,
      host,
      pathname
    },
    addAuthHeaderToOptions(otherHeaders)
  )
  return res.status === 204
}

export async function getContent(path) {
  let pathQuery = '/error'
  console.log('%c XXX', 'color: yellow; font-size: large', path)
  switch (path) {
    case '/':
      pathQuery = path
      break
    case /\/resume\/?$/.test(path):
      pathQuery = '/resume'
      break
    case /\/apps\/?$/.test(path):
      pathQuery = '/apps'
      break
    case /\/contact\/?$/.test(path):
      pathQuery = '/contact'
      break
  }
  console.log('%c XXX', 'color: yellow; font-size: large', pathQuery)
  const res = await axios.get(
    `${process.env.API_URL}?path=${pathQuery}`,
    addAuthHeaderToOptions(otherHeaders)
  )

  console.log('%c XXX', 'color: yellow; font-size: large', res)

  if (res.status === 200) return res.data

  throw new Error('no content')
}
