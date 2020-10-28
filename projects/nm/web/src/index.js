import { createElement } from 'react'
import { render } from 'react-dom'
import { setChunkPublicPath } from '@cjo3/shared/react/helpers'
import { App } from './App'

__webpack_public_path__ = setChunkPublicPath(
  `https://${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/`
)

render(createElement(App), document.getElementById('app'))
