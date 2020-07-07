import { createHashId } from '@colin30/shared/react/helpers'
import { KeConstants } from '@colin30/shared/raw/constants/keywordMultiplier'

export const setFields = []

for (let i = 1; i <= 5; i += 1) {
  const setName = `setField${i}`
  setFields.push({
    group: {
      className: `${setName}GridPosition`
    },
    label: {
      name: i,
      id: createHashId()
    },
    textArea: {
      setName,
      rows: 8,
      placeholder: 'Enter keywords here',
      initialValue: ''
    },
    validations: [],
    key: createHashId()
  })
}

export const matchTypes = [
  {
    key: createHashId(),
    label: 'Broad',
    value: KeConstants.MATCHTYPES.BROAD
  },
  {
    key: createHashId(),
    label: '+Broad +Modifier',
    value: KeConstants.MATCHTYPES.BROAD_MODIFIER
  },
  {
    key: createHashId(),
    label: '"Phrase"',
    value: KeConstants.MATCHTYPES.PHRASE
  },
  {
    key: createHashId(),
    label: '[Exact]',
    value: KeConstants.MATCHTYPES.EXACT
  }
]

export const whiteSpaceOptions = [
  {
    key: createHashId(),
    label: KeConstants.WHITESPACE_OPTIONS.DISABLED.LABEL,
    value: KeConstants.WHITESPACE_OPTIONS.DISABLED.VALUE
  },
  {
    key: createHashId(),
    label: KeConstants.WHITESPACE_OPTIONS.NONE.LABEL,
    value: KeConstants.WHITESPACE_OPTIONS.NONE.VALUE
  },
  {
    key: createHashId(),
    label: KeConstants.WHITESPACE_OPTIONS.HYPHEN.LABEL,
    value: KeConstants.WHITESPACE_OPTIONS.HYPHEN.VALUE
  },
  {
    key: createHashId(),
    label: KeConstants.WHITESPACE_OPTIONS.UNDERSCORE.LABEL,
    value: KeConstants.WHITESPACE_OPTIONS.UNDERSCORE.VALUE
  }
]

export const volumeDataFields = [
  {
    key: createHashId(),
    label: KeConstants.VOLUME_DATA.CPC.LABEL,
    value: KeConstants.VOLUME_DATA.CPC.VALUE
  },
  {
    key: createHashId(),
    label: KeConstants.VOLUME_DATA.COMP.LABEL,
    value: KeConstants.VOLUME_DATA.COMP.VALUE
  },
  {
    key: createHashId(),
    label: KeConstants.VOLUME_DATA.TREND.LABEL,
    value: KeConstants.VOLUME_DATA.TREND.VALUE
  }
]

export const kEFields = [
  {
    key: createHashId(),
    name: KeConstants.KE_OPTIONS.COUNTRY.NAME,
    label: KeConstants.KE_OPTIONS.COUNTRY.LABEL,
    kind: KeConstants.KE_OPTIONS.COUNTRY.KIND,
    optionsName: KeConstants.KE_OPTIONS.COUNTRY.OPTIONS_NAME
  },
  {
    key: createHashId(),
    name: KeConstants.KE_OPTIONS.CURRENCY.NAME,
    label: KeConstants.KE_OPTIONS.CURRENCY.LABEL,
    kind: KeConstants.KE_OPTIONS.CURRENCY.KIND,
    optionsName: KeConstants.KE_OPTIONS.CURRENCY.OPTIONS_NAME
  },
  {
    key: createHashId(),
    name: KeConstants.KE_OPTIONS.DATASOURCE.NAME,
    label: KeConstants.KE_OPTIONS.DATASOURCE.LABEL,
    kind: KeConstants.KE_OPTIONS.DATASOURCE.KIND,
    optionsName: KeConstants.KE_OPTIONS.DATASOURCE.OPTIONS_NAME
  }
]
