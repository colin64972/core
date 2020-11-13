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
  detectionLimitTrigger: 'Cannot include spaces or digits',
  alphaOnlyString: 'Must contain only letters'
}

export const exportButtons = [
  { label: 'Copy', name: 'copy', key: createHashId() },
  { label: 'CSV', name: 'csv', key: createHashId() },
  { label: 'XLSX', name: 'xlsx', key: createHashId() }
]
