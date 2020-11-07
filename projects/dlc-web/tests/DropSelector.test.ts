import { testRenderer, renderSnapshot } from './setup'
import { DropSelector } from '../src/App/Editor/DropSelector'

describe('DropSelector', () => {
  describe('render', () => {
    test('matches current snapshop', () => {
      const tree = renderSnapshot('/editor', DropSelector)
      expect(tree).toMatchSnapshot()
    })

    test('renders dropSelector', () => {
      const { getByTestId, screen } = testRenderer('/editor', DropSelector)
      const dropSelector = getByTestId('drop-selector')
      expect(dropSelector).toBeInTheDocument()
    })
  })

  describe('events', () => {})
})
