import colors from 'colors'
import path from 'path'
import fs from 'fs'
import { minify } from 'html-minifier'
import compileReactPage from './templates/compileReactPage.pug'
import { fetchPreRendersFile } from '@cjo3/shared/serverless/fetchers'

export const buildFromPreRender = async (appDir, pagePath, templateLocals) => {
  try {
    let rendersFile, preRenderedPages

    if (process.env.IS_OFFLINE) {
      const localFilePath = path.resolve(
        `../${appDir}/web/distPreRenders/preRenders.js`
      )

      rendersFile = fs.readFileSync(localFilePath).toString()

      preRenderedPages = eval(rendersFile.toString()).preRenders
    } else {
      rendersFile = await fetchPreRendersFile(appDir)

      preRenderedPages = eval(rendersFile).preRenders
    }

    const { html, css, state } = preRenderedPages[pagePath]

    const pageContent = compileReactPage({
      ...templateLocals,
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
