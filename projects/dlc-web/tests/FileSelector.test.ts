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
      const { getAllByRole } = testRenderer('/editor', FileSelector)
      const buttons = getAllByRole('button')
      expect(buttons.length).toBe(3)
    })

    test('renders hidden file input', () => {
      const { getByLabelText } = testRenderer('/editor', FileSelector)
      const input = getByLabelText('select file', { exact: false })
      expect(input).not.toBeVisible()
      expect(input.name).toBe('file-upload-input')
      expect(input).toHaveAttribute('type', 'file')
    })

    test('renders no file status', () => {
      const { getByText } = testRenderer('/editor', FileSelector)
      const status = getByText('no file selected', { exact: false })
      expect(status).toBeInTheDocument()
    })

    test('submit is disabled', () => {
      const { getByRole, screen } = testRenderer('/editor', FileSelector)
      const submitButton = getByRole('button', { name: /load/i })
      expect(submitButton).toHaveAttribute('disabled')
    })

    test('reset is disabled', () => {
      const { getByRole, screen } = testRenderer('/editor', FileSelector)
      const resetButton = getByRole('button', { name: /reset/i })
      expect(resetButton).toHaveAttribute('disabled')
    })
  })

  describe('events', () => {
    test('choose file', () => {
      const {
        getByLabelText,
        getByText,
        getByRole,
        userEvent: { upload }
      } = testRenderer('/editor', FileSelector)
      const input = getByLabelText('select file', { exact: false })
      const testFile = new File(['asdf'], 'asdf.xls', { type: 'xls ' })
      upload(input, testFile)
      const fileNameStatus = getByText(testFile.name, { exact: false })
      expect(fileNameStatus).toBeInTheDocument()
      const submitButton = getByRole('button', { name: /load/i })
      expect(submitButton).not.toHaveAttribute('disabled')
      const resetButton = getByRole('button', { name: /reset/i })
      expect(resetButton).not.toHaveAttribute('disabled')
    })

    test('choose file and then another', () => {
      const {
        getByLabelText,
        getByText,
        queryByText,
        userEvent: { upload }
      } = testRenderer('/editor', FileSelector)
      const input = getByLabelText('select file', { exact: false })
      const testFile = new File(['asdf'], 'asdf.xls', { type: 'xls ' })
      upload(input, testFile)
      let fileNameStatus = getByText(testFile.name, { exact: false })
      expect(fileNameStatus).toBeInTheDocument()
      const testFile2 = new File(['asdf'], 'qwer.xls', { type: 'xls ' })
      upload(input, testFile2)
      fileNameStatus = queryByText(testFile.name, { exact: false })
      expect(fileNameStatus).not.toBeInTheDocument()
      const fileNameStatus2 = getByText(testFile2.name, { exact: false })
      expect(fileNameStatus2).toBeInTheDocument()
    })

    test('choose file and reset form', () => {
      const {
        getByLabelText,
        getByRole,
        queryByText,
        userEvent: { upload, click }
      } = testRenderer('/editor', FileSelector)
      const input = getByLabelText('select file', { exact: false })
      const testFile = new File(['asdf'], 'asdf.xls', { type: 'xls ' })
      upload(input, testFile)
      const resetButton = getByRole('button', { name: /reset/i })
      click(resetButton)
      const noFileStatus = queryByText('no file selected', { exact: false })
      expect(noFileStatus).toBeInTheDocument()
      expect(resetButton).toHaveAttribute('disabled')
      const submitButton = getByRole('button', { name: /load/i })
      expect(submitButton).toHaveAttribute('disabled')
    })

    test('choose file and submit form', () => {
      const {
        getByLabelText,
        getByRole,
        userEvent: { upload, click },
        screen
      } = testRenderer('/editor', FileSelector, props)
      const input = getByLabelText('select file', { exact: false })
      const testFile = new File(['asdf'], 'asdf.xls', { type: 'xls ' })
      upload(input, testFile)
      const loadButton = getByRole('button', { name: /load/i })
      click(loadButton)
      expect(props.setLoadedFile).toHaveBeenCalled()
    })
  })
})
