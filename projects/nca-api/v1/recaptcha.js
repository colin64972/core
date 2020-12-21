import axios from 'axios'

export async function checkToken(token, ip) {
  try {
    const res = await axios.post(
      `${process.env.RECAPTCHA_API_URL}?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}&remoteip=${ip}`
    )
    if (res.data.success)
      return {
        statusCode: res.status,
        body: JSON.stringify(res.data)
      }
    throw new Error(JSON.stringify(res.data['error-codes']))
  } catch (error) {
    console.log('ERROR checkToken'.red, error)
    return {
      statusCode: 500,
      body: error.message
    }
  }
}
