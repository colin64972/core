import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './App/theme'
import Loadable from 'react-loadable'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { setStore } from './store'
import { setChunkPublicPath } from '@cjo3/shared/react/helpers'

__webpack_public_path__ = setChunkPublicPath(
  `${process.env.CDN_URL}/${process.env.CDN_APP_FOLDER}/`
)

console.log('%c theme', 'color: lightyellow; font-size: large', theme)

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
