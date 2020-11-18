import { post } from 'axios'

export const makePreOrder = async () => {
  let apiUrl = 'http://localhost:2000'

  if (process.env.NODE_ENV === 'production') apiUrl = process.env.API_URL

  try {
    const res = await post(`${apiUrl}/pre-order`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
