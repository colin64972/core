import { createElement } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './App/theme'
import Loadable from 'react-loadable'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { setStore } from './store'

console.log('%c theme', 'color: lightyellow; font-size: large', theme)

const store = setStore()

const AppLoadable = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "chunk-App" */
      /* webpackPrefetch: false */
      './App'
    ),
  loading: () =>
    createElement(BackDropScreen, {
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
    createElement(
      BrowserRouter,
      {},
      createElement(ThemeProvider, { theme }, createElement(AppLoadable))
    )
  ),
  document.getElementById('app')
)
