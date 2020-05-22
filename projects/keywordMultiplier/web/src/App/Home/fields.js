import { createHashId } from '@colin30/shared/react/helpers'
import { constants } from '../constants'

export const sets = []

for (let i = 1; i <= 5; i += 1) {
  sets.push({
    componentType: 'WordSet',
    name: `set-${i}`,
    class: `set${i}`,
    label: i,
    rows: 8,
    placeholder: 'Enter words here',
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
  },
  {
    key: createHashId(),
    label: constants.VOLUME_DATA.TREND.LABEL,
    value: constants.VOLUME_DATA.TREND.VALUE
  }
]
