import { testRenderer, renderSnapshot } from './testRenderer'
import { Home } from '../src/App/Home'

describe('Home', () => {
  describe('render', () => {
    test('matches current snapshop', () => {
      const tree = renderSnapshot(Home, '/')
      expect(tree).toMatchSnapshot()
    })

    test('renders heading', () => {
      const { getByRole } = testRenderer('/', Home)
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })

    test('renders copy', () => {
      const { getByText } = testRenderer('/', Home)
      const copy = getByText('consetetur', {
        selector: 'p',
        exact: false
      })
      expect(copy).toBeInTheDocument()
    })

    test('renders link to editor', () => {
      const { getByRole } = testRenderer('/', Home)
      const startLink = getByRole('link', { name: /start/i })
      expect(startLink).toHaveAttribute('href', '/editor')
    })
  })

  describe('events', () => {
    test('link clicks to editor', () => {
      const {
        getByRole,
        userEvent: { click }
      } = testRenderer('/')
      const startLink = getByRole('link', { name: /start/i })
      click(startLink)
      const heading = getByRole('heading', { level: 1 })
      expect(heading.innerHTML).toBe('Editor')
    })
  })
})
