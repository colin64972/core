import { createHashId } from '@cjo3/shared/react/helpers'
import { MenuItem } from '../../d.ts'

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
    to: '/resume/'
  },
  {
    key: createHashId(),
    label: 'Apps',
    icon: 'apps',
    to: '/apps/'
  },
  {
    key: createHashId(),
    label: 'Contact',
    icon: 'contact',
    to: '/contact/'
  }
]
