import { createHashId } from '@cjo3/shared/react/helpers'
import { MenuItem, OptionMap } from '../../d'

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
