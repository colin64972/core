import { theme } from '../src/theme'
import renderer from 'react-test-renderer'
import { ThemeProvider } from '@material-ui/core/styles'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import 'colors'
import { createElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { ThemedApp } from '../src/ThemedApp'
import { State } from '../src/store/'
import { setReduxStore } from '../src/store'
import { Provider } from 'react-redux'

export const testRenderer = (
  path: string,
  component?: React.FC,
  props?: {
    [key: string]: any
  },
  state: State = null
): any => {
  const helpers = {
    screen,
    waitFor,
    userEvent
  }
  return {
    ...helpers,
    ...render(
      createElement(
        MemoryRouter,
        { initialEntries: [path] },
        createElement(
          Provider,
          { store: setReduxStore(state) },
          component
            ? createElement(
                ThemeProvider,
                { theme },
                createElement(component, props)
              )
            : ThemedApp
        )
      )
    )
  }
}

export const renderSnapshot = (
  path: string,
  component: React.FC,
  props: { [key: string]: any } = null,
  state: State = null
) =>
  renderer
    .create(
      createElement(
        MemoryRouter,
        { initialEntries: [path] },
        createElement(
          Provider,
          {
            store: setReduxStore(state)
          },
          createElement(
            ThemeProvider,
            { theme },
            createElement(component, props)
          )
        )
      )
    )
    .toJSON()
