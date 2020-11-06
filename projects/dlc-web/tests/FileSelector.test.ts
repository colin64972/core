import { testRenderer, renderSnapshot } from './setup'
import { FileSelector } from '../src/App/Editor/FileSelector'

const props = {
  setLoadedFile: jest.fn()
}

describe('FileSelector', () => {
  describe('render', () => {
    test('matches current snapshop', () => {
      const tree = renderSnapshot('/editor', FileSelector, props)
      expect(tree).toMatchSnapshot()
    })

    test('renders 3 buttons', () => {
      const { getAllByRole } = testRenderer('/editor', FileSelector, props)
      const buttons = getAllByRole('button')
      expect(buttons.length).toBe(3)
    })

    test('renders hidden file input', () => {
      const { getByLabelText } = testRenderer('/editor', FileSelector, props)
      const input = getByLabelText('select file', { exact: false })
      expect(input).toHaveClass('makeStyles-hidden-2')
      expect(input.name).toBe('file-upload-input')
      expect(input).toHaveAttribute('type', 'file')
    })

    test('renders no file status', () => {
      const { getByText } = testRenderer('/editor', FileSelector, props)
      const status = getByText('no file selected', { exact: false })
      expect(status).toBeInTheDocument()
    })
  })

  describe('events', () => {
    test('choose file', () => {
      const {
        getByLabelText,
        getByText,
        userEvent: { upload }
      } = testRenderer('/editor', FileSelector, props)
      const input = getByLabelText('select file', { exact: false })
      const testFile = new File(['asdf'], 'asdf.xls', { type: 'xls ' })
      upload(input, testFile)
      const fileNameStatus = getByText(testFile.name, { exact: false })
      expect(fileNameStatus).toBeInTheDocument()
    })

    test('choose file and reset form', () => {
      const {
        getByLabelText,
        getByRole,
        queryByText,
        userEvent: { upload, click }
      } = testRenderer('/editor', FileSelector, props)
      const input = getByLabelText('select file', { exact: false })
      const testFile = new File(['asdf'], 'asdf.xls', { type: 'xls ' })
      upload(input, testFile)
      const resetButton = getByRole('button', { name: /reset/i })
      click(resetButton)
      const noFileStatus = queryByText('no file selected', { exact: false })
      expect(noFileStatus).toBeInTheDocument()
    })

    test('choose file and submit form', () => {
      const {
        getByLabelText,
        getByRole,
        userEvent: { upload, click }
      } = testRenderer('/editor')
      const input = getByLabelText('select file', { exact: false })
      const testFile = new File(['asdf'], 'asdf.xls', { type: 'xls ' })
      upload(input, testFile)
      const loadButton = getByRole('button', { name: /load/i })
      click(loadButton)
      const unloadButton = getByRole('button', { name: /unload/i })
      expect(unloadButton).toBeInTheDocument()
    })
  })
})
