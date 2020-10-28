import { render } from 'react-dom'
import { setChunkPublicPath } from '@cjo3/shared/react/helpers'
import { AppElement } from './AppElement'

__webpack_public_path__ = setChunkPublicPath(
  `https://${process.env.CDN_BUCKET}/${process.env.CDN_APP_FOLDER}/`
)

render(AppElement, document.getElementById('app'))
