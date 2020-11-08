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

export const testRenderer = (
  path: string,
  component?: React.FC,
  props?: {
    [key: string]: any
  }
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
        component
          ? createElement(
              ThemeProvider,
              { theme },
              createElement(component, props)
            )
          : ThemedApp
      )
    )
  }
}

export const renderSnapshot = (
  path: string,
  component: React.FC,
  props: { [key: string]: any } = null
) =>
  renderer
    .create(
      createElement(
        MemoryRouter,
        { initialEntries: [path] },
        createElement(ThemeProvider, { theme }, createElement(component, props))
      )
    )
    .toJSON()
