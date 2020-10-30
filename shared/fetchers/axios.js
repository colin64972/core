import { get } from 'axios'

export const fetchPreRender = async (appDir, page) => {
  try {
    const res = await get(
      `${process.env.CDN_URL}/${appDir}/assets/pre-renders/${page}.html`
    )
    return res.data
  } catch (error) {
    throw error
  }
}
