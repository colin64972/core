import { theme } from '@cjo3/shared/react/themes/dlc'
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
