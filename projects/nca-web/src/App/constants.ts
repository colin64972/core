import { createHashId } from '@cjo3/shared/react/helpers'
import { messageTypeLabels } from '@cjo3/shared/raw/constants/nca'
import { MenuItem, OptionMap, SelectOption } from '../../index'

export const menuItems: MenuItem[] = [
  {
    key: createHashId(),
    label: 'Home',
    icon: 'home',
    to: '/'
  },
  {
    key: createHashId(),
    label: 'Resume',
    icon: 'resume',
    to: '/resume/',
    midNavDir: 'midNavLeft'
  },
  {
    key: createHashId(),
    label: 'Apps',
    icon: 'apps',
    to: '/apps/',
    midNavDir: 'midNavRight'
  },
  {
    key: createHashId(),
    label: 'Contact',
    icon: 'contact',
    to: '/contact/',
    midNavDir: 'midNavLeft'
  }
]

export const skillCategory: OptionMap = {
  language: 0,
  front: 1,
  back: 2,
  tool: 3,
  aws: 4,
  design: 5,
  marketing: 6
}

export const inputTypes: OptionMap = {
  text: 0,
  select: 1
}

export const messageTypes: OptionMap = {
  [messageTypeLabels[0]]: messageTypeLabels.indexOf(messageTypeLabels[0]),
  [messageTypeLabels[1]]: messageTypeLabels.indexOf(messageTypeLabels[1]),
  [messageTypeLabels[2]]: messageTypeLabels.indexOf(messageTypeLabels[2])
}

export const contactFormMessageTypeOptions: SelectOption[] = [
  {
    key: createHashId(),
    label: messageTypeLabels[0],
    value: messageTypes[messageTypeLabels[0]]
  },
  {
    key: createHashId(),
    label: messageTypeLabels[1],
    value: messageTypes[messageTypeLabels[1]]
  },
  {
    key: createHashId(),
    label: messageTypeLabels[2],
    value: messageTypes[messageTypeLabels[2]]
  }
]
