import { createElement } from 'react'
import { render } from 'react-dom'
import { setChunkPublicPath } from '@cjo3/shared/react/helpers'
import { BrowserRouter } from 'react-router-dom'
import { AppElement } from './AppElement'

__webpack_public_path__ = setChunkPublicPath(
  `https://${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/`
)

render(
  createElement(BrowserRouter, {}, AppElement),
  document.getElementById('app')
)
