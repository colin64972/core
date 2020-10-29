import colors from 'colors'
import path from 'path'
import fs from 'fs'
import { minify } from 'html-minifier'
import compileReactPage from './templates/compileReactPage.pug'
import { fetchPreRendersFile } from '@cjo3/shared/serverless/fetchers'

export const buildFromPreRender = async (appName, pagePath, metaData) => {
  try {
    let rendersFile, preRenderedPages

    if (process.env.IS_OFFLINE) {
      const localFilePath = path.resolve(
        `../${appName}/web/distPreRenders/preRenders.js`
      )

      rendersFile = fs.readFileSync(localFilePath).toString()

      preRenderedPages = eval(rendersFile.toString()).preRenders
    } else {
      rendersFile = await fetchPreRendersFile(appName)

      preRenderedPages = eval(rendersFile).preRenders
    }

    const { html, css, state } = preRenderedPages[pagePath]

    const pageContent = compileReactPage({
      ...metaData,
      appStyle: css,
      appMarkup: html,
      appState: state
    })

    return minify(pageContent, {
      minifyCSS: true
    })
  } catch (error) {
    console.error('ERROR buildFromPreRender'.red, error)
    throw error
  }
}
