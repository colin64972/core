import { createHashId } from '@colin30/shared/react/helpers'
import constants from '../constants'

const sets = []

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

const matchTypes = [
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

export default {
  sets,
  matchTypes
}
