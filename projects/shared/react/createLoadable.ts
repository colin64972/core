import * as Loadable from 'react-loadable'
import { BackDropScreen } from './components/BackDropScreen'
import { createElement } from 'react'

export const createLoadable = (
  name: string,
  importModule
): Loadable.LoadableComponent =>
  Loadable({
    loader: () => importModule,
    loading: (): React.ReactElement =>
      createElement(BackDropScreen, {
        isOpen: true,
        spinner: true
      }),
    render: (loaded, props): React.ReactElement =>
      createElement(loaded[name], {
        ...props
      })
  })
