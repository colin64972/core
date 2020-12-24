import { addAuthHeaderToOptions } from '@cjo3/shared/security/authToken'
import axios from 'axios'

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
    `${process.env.API_URL}/nca/contact`,
    {
      ...payload,
      host,
      pathname
    },
    addAuthHeaderToOptions(otherHeaders)
  )
  return res.status === 204
}

export async function getContent() {
  const res = await axios.get(
    process.env.BUILD_ENV === 'production'
      ? `${process.env.CDN_URL_PRO}/${process.env.CDN_APP_FOLDER}/content.json`
      : `${process.env.CDN_URL_STA}/${process.env.CDN_APP_FOLDER}/content.json`
  )

  if (res.status === 200) return res.data

  throw new Error('no content')
}

export async function testRecaptchaToken(token, action) {
  const ipRes = await axios.get('https://api.ipify.org?format=json')

  const res = await axios.post(
    `${process.env.API_URL}/nca/recaptcha`,
    {
      token,
      ip: ipRes?.data.ip
    },
    addAuthHeaderToOptions(otherHeaders)
  )

  return (
    res.data.action === action &&
    res.data.score > parseFloat(process.env.RECAPTCHA_VALID_SCORE)
  )
}
