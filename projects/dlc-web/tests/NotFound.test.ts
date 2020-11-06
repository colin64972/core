import { testRenderer } from './testRenderer'
import { NotFound } from '../src/App/NotFound'

describe('NotFound', () => {
  describe('render', () => {
    test('renders heading', () => {
      const { getByRole } = testRenderer('/error', NotFound)
      const h1 = getByRole('heading', { level: 1, name: 'Error' })
      expect(h1).toBeInTheDocument()
    })

    test('renders copy', () => {
      const { getByText } = testRenderer('/error', NotFound)
      const copy = getByText('sorry', {
        selector: 'p',
        exact: false
      })
      expect(copy).toBeInTheDocument()
    })

    test('renders link to home', () => {
      const { getByRole } = testRenderer('/error', NotFound)
      const homeLink = getByRole('link', { name: /home/i })
      expect(homeLink).toHaveAttribute('href', '/')
    })
  })

  describe('events', () => {
    test('link clicks to home', () => {
      const {
        getByRole,
        userEvent: { click }
      } = testRenderer('/error')
      const homeLink = getByRole('link', { name: /home/i })
      click(homeLink)
      const startLink = getByRole('link', { name: /start/i })
      expect(startLink).toBeInTheDocument()
    })
  })
})
