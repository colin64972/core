import { renderToString } from 'react-dom/server'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { AppElement } from './AppElement'

const sheets = new ServerStyleSheets()

export const html = renderToString(sheets.collect(AppElement))

export const css = sheets.toString()
