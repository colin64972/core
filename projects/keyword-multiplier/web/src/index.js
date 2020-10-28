import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '@cjo3/shared/react/themes/keyword-multiplier'
import Loadable from 'react-loadable'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { setStore } from './store'
import { setChunkPublicPath } from '@cjo3/shared/react/helpers'

console.log('%c theme', 'color: yellow; font-size: large', theme)

__webpack_public_path__ = setChunkPublicPath(
  `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/`
)

const store = setStore()

const AppLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-App" */
      /* webpackPrefetch: true */
      './App'
    ),
  loading: () =>
    createElement(BackDropScreen, {
      backdrop: false,
      isOpen: true,
      spinner: true
    }),
  render: (loaded, props) => {
    let Component = loaded.App
    return createElement(Component, { ...props })
  }
})

render(
  createElement(
    Provider,
    { store },
    createElement(ThemeProvider, { theme }, createElement(AppLoadable))
  ),
  document.getElementById('app')
)
