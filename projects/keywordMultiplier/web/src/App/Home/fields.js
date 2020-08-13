import { createHashId } from '@colin30/shared/react/helpers'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'

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
    value: constants.MATCHTYPES.BROAD
  },
  {
    key: createHashId(),
    label: '+Broad +Modifier',
    value: constants.MATCHTYPES.BROAD_MODIFIER
  },
  {
    key: createHashId(),
    label: '"Phrase"',
    value: constants.MATCHTYPES.PHRASE
  },
  {
    key: createHashId(),
    label: '[Exact]',
    value: constants.MATCHTYPES.EXACT
  }
]

export const whiteSpaceOptions = [
  {
    key: createHashId(),
    label: constants.WHITESPACE_OPTIONS.DISABLED.LABEL,
    value: constants.WHITESPACE_OPTIONS.DISABLED.VALUE
  },
  {
    key: createHashId(),
    label: constants.WHITESPACE_OPTIONS.NONE.LABEL,
    value: constants.WHITESPACE_OPTIONS.NONE.VALUE
  },
  {
    key: createHashId(),
    label: constants.WHITESPACE_OPTIONS.HYPHEN.LABEL,
    value: constants.WHITESPACE_OPTIONS.HYPHEN.VALUE
  },
  {
    key: createHashId(),
    label: constants.WHITESPACE_OPTIONS.UNDERSCORE.LABEL,
    value: constants.WHITESPACE_OPTIONS.UNDERSCORE.VALUE
  }
]

export const volumeDataFields = [
  {
    key: createHashId(),
    label: constants.VOLUME_DATA.CPC.LABEL,
    value: constants.VOLUME_DATA.CPC.VALUE
  },
  {
    key: createHashId(),
    label: constants.VOLUME_DATA.COMP.LABEL,
    value: constants.VOLUME_DATA.COMP.VALUE
  }
  // {
  //   key: createHashId(),
  //   label: constants.VOLUME_DATA.TREND.LABEL,
  //   value: constants.VOLUME_DATA.TREND.VALUE
  // }
]

export const kEFields = [
  {
    key: createHashId(),
    name: constants.KE_OPTIONS.COUNTRY.NAME,
    label: constants.KE_OPTIONS.COUNTRY.LABEL,
    optionsName: constants.KE_OPTIONS.COUNTRY.OPTIONS_NAME,
    className: constants.KE_OPTIONS.COUNTRY.CLASSNAME
  },
  {
    key: createHashId(),
    name: constants.KE_OPTIONS.CURRENCY.NAME,
    label: constants.KE_OPTIONS.CURRENCY.LABEL,
    optionsName: constants.KE_OPTIONS.CURRENCY.OPTIONS_NAME,
    className: constants.KE_OPTIONS.CURRENCY.CLASSNAME
  },
  {
    key: createHashId(),
    name: constants.KE_OPTIONS.DATASOURCE.NAME,
    label: constants.KE_OPTIONS.DATASOURCE.LABEL,
    optionsName: constants.KE_OPTIONS.DATASOURCE.OPTIONS_NAME,
    className: constants.KE_OPTIONS.DATASOURCE.CLASSNAME
  }
]
