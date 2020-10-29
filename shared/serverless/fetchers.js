import { get } from 'axios'

export const fetchPreRendersFile = async appDir => {
  try {
    const res = await get(
      `${process.env.CDN_URL}/${appDir}/assets/pre-renders/index.js`
    )

    return res.data
  } catch (error) {
    console.error('ERROR fetchPreRendersFile'.red, error)

    throw error
  }
}
