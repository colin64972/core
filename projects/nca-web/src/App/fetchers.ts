import axios from 'axios'
import path from 'path'
import fs from 'fs'
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
    process.env.API_URL,
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
