import { testRenderer, renderSnapshot } from './testRenderer'
import { Editor } from '../src/App/Editor'

describe('Editor', () => {
  describe('render', () => {
    test('matches current snapshop', () => {
      const tree = renderSnapshot(Editor, '/editor')
      expect(tree).toMatchSnapshot()
    })

    test('renders heading', () => {
      const { getByRole } = testRenderer('/editor', Editor)
      const heading = getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })

    test('renders copy', () => {
      const { getByText } = testRenderer('/editor', Editor)
      const copy = getByText('voluptua', {
        selector: 'p',
        exact: false
      })
      expect(copy).toBeInTheDocument()
    })

    test('renders top nav', () => {
      const { getAllByRole } = testRenderer('/editor', Editor)
      const links = getAllByRole('link')
      expect(links.length).toBe(3)
    })

    test('renders file loader', () => {
      const { getByRole } = testRenderer('/editor', Editor)
      const selectFileButton = getByRole('button', { name: /select file/i })
      expect(selectFileButton).toBeInTheDocument()
    })
  })
})
