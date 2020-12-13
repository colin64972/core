const { createHashId } = require('@cjo3/shared/raw/general')

exports.navItems = [
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
