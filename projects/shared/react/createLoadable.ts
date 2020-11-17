import * as Loadable from 'react-loadable'
import { BackDropScreen } from './components/BackDropScreen'
import { createElement } from 'react'

export const createLoadable = (
  name: string,
  importModule: any
): Loadable.LoadableComponent =>
  Loadable({
    loader: (): typeof importModule => importModule,
    loading: (): React.ReactElement =>
      createElement(BackDropScreen, {
        isOpen: true,
        spinner: true
      }),
    render: (loaded: any, props: any): React.ReactElement =>
      createElement(loaded[name], {
        ...props
      })
  })
