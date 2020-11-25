import { createHashId } from '@cjo3/shared/react/helpers'

export const transformFunctionValues: {
  [key: string]: string
} = {
  leave: 'leave',
  halve: 'halve',
  zero: 'zero',
  none: 'none'
}

export const transformOptions: {
  key: string
  label: string
  value: string
}[] = [
  {
    key: createHashId(),
    label: 'Leave value',
    value: transformFunctionValues.leave
  },
  {
    key: createHashId(),
    label: 'Halve value',
    value: transformFunctionValues.halve
  },
  {
    key: createHashId(),
    label: 'Zero value',
    value: transformFunctionValues.zero
  },
  {
    key: createHashId(),
    label: 'No transform',
    value: transformFunctionValues.none
  }
]

export const schemaErrors = {
  required: 'Required',
  excelCellAddress: 'Invalid cell address',
  detectionLimitTrigger: 'May not include spaces or digits',
  anyButSpaces: 'May not include spaces',
  invalidEmailAddress: 'Invalid email address'
}

export const exportButtons = [
  {
    label: 'XLS',
    name: 'xls',
    bookType: 'biff8',
    key: createHashId()
  },
  { label: 'XLSX', name: 'xlsx', bookType: 'xlsx', key: createHashId() }
]

export const topNavItems = [
  {
    key: 'comon',
    to: '/',
    label: 'Home'
  },
  {
    key: 'karim',
    to: '/converter',
    label: 'Converter'
  }
]

export const SNACKBAR_TIMEOUT = 5000

export const summaryPanels = [
  {
    caseType: 'ul',
    title: 'Under Limit Cases',
    key: createHashId()
  },
  {
    caseType: 'ol',
    title: 'Over Limit Cases',
    key: createHashId()
  },
  {
    caseType: 'zero',
    title: 'Zero Trigger Cases',
    key: createHashId()
  }
]
