import { read, utils } from 'xlsx'

export const createWorkbook = (fileBlob, callback) => {
  const reader = new FileReader()
  reader.onload = event => {
    const arrayBuffer = new Uint8Array(event.target.result)
    const wb = read(arrayBuffer, { type: 'array' })
    if (wb) callback(wb)
  }
  reader.onerror = event => {
    console.error(
      '%c ERROR reader.onerror',
      'color: red; font-size: large',
      event
    )
  }
  reader.readAsArrayBuffer(fileBlob)
}

export const convertSheet = (sheet, range = null) =>
  utils.sheet_to_json(sheet, {
    blankrows: true,
    raw: true,
    header: 1,
    range: typeof range === 'string' ? range.toUpperCase() : range,
    defval: null
  })
