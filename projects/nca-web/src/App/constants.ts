import { createHashId } from '@cjo3/shared/react/helpers'
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
  tools: 3,
  aws: 4,
  design: 5,
  marketing: 6
}

export const messageTypes: OptionMap = {
  inquiry: 0,
  feedback: 1,
  support: 2
}

export const inputTypes: OptionMap = {
  text: 0,
  select: 1
}

export const contactFormMessageTypeOptions: SelectOption[] = [
  {
    key: createHashId(),
    label: 'Inquiry',
    value: messageTypes.inquiry
  },
  {
    key: createHashId(),
    label: 'Feedback',
    value: messageTypes.feedback
  },
  {
    key: createHashId(),
    label: 'Support',
    value: messageTypes.support
  }
]
