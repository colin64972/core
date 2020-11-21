import { testRenderer, renderSnapshot } from './setup'
import { TopNav } from '../src/App/TopNav'

describe('TopNav', () => {
  describe('render', () => {
    test('matches current snapshop', () => {
      const tree = renderSnapshot('/editor', TopNav)
      expect(tree).toMatchSnapshot()
    })
    test('renders 3 links', () => {
      const { getAllByRole } = testRenderer('/editor', TopNav)
      const links = getAllByRole('link')
      expect(links.length).toBe(3)
    })

    test('renders link to home', () => {
      const { getByRole } = testRenderer('/editor', TopNav)
      const homeLink = getByRole('link', { name: /home/i })
      expect(homeLink).toHaveAttribute('href', '/')
    })

    test('renders link to editor', () => {
      const { getByRole } = testRenderer('/editor', TopNav)
      const editorLink = getByRole('link', { name: /editor/i })
      expect(editorLink).toHaveAttribute('href', '/editor')
    })

    test('renders link to error', () => {
      const { getByRole } = testRenderer('/editor', TopNav)
      const errorLink = getByRole('link', { name: /error/i })
      expect(errorLink).toHaveAttribute('href', '/error')
    })
  })

  describe('events', () => {
    test('link clicks to home', () => {
      const {
        getByRole,
        userEvent: { click }
      } = testRenderer('/editor')
      const homeLink = getByRole('link', { name: /home/i })
      click(homeLink)
      const startLink = getByRole('link', { name: /start/i })
      expect(startLink).toBeInTheDocument()
    })

    test('link clicks to editor', () => {
      const {
        getByRole,
        getByText,
        userEvent: { click }
      } = testRenderer('/editor')
      const editorLink = getByRole('link', { name: /editor/i })
      click(editorLink)
      const heading = getByText('Editor', {
        selector: 'h1',
        exact: true
      })
      expect(heading).toBeInTheDocument()
    })

    test('link clicks to error', () => {
      const {
        getByRole,
        getByText,
        userEvent: { click }
      } = testRenderer('/editor')
      const homeLink = getByRole('link', { name: /home/i })
      click(homeLink)
      const copy = getByText('consetetur', {
        selector: 'p',
        exact: false
      })
      expect(copy).toBeInTheDocument()
    })
  })
})
