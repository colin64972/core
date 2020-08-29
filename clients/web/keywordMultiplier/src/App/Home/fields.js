import { generateKey } from '@colin30/clients-web-shared/react'
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
    key: generateKey()
  })
}

const matchTypes = [
  {
    key: generateKey(),
    label: 'Broad',
    value: constants.MATCHTYPES.BROAD
  },
  {
    key: generateKey(),
    label: '+Broad +Modifier',
    value: constants.MATCHTYPES.BROAD_MODIFIER
  },
  {
    key: generateKey(),
    label: '"Phrase"',
    value: constants.MATCHTYPES.PHRASE
  },
  {
    key: generateKey(),
    label: '[Exact]',
    value: constants.MATCHTYPES.EXACT
  }
]

export default {
  sets,
  matchTypes
}
