export const depositEth = {
  name: 'depositEth',
  currency: 'eth',
  key: 'sli3902',
  fields: [
    {
      componentType: 'NumberInput',
      label: 'ETH',
      name: 'depositEth',
      fullWidth: true,
      min: 0.00001,
      step: 0.00001,
      type: 'number',
      buttonLabel: 'Deposit ETH',
      validation: [
        {
          message: 'Required',
          required: false,
        },
        {
          message: 'Must be greater than 0',
          greaterThan: 0,
        },
      ],
      key: 'cxl3200',
    },
  ],
}

export const depositNeb = {
  name: 'depositNeb',
  currency: 'neb',
  key: 'ief8480',
  fields: [
    {
      componentType: 'NumberInput',
      label: 'NEB',
      name: 'depositNeb',
      fullWidth: true,
      min: 0.00001,
      step: 0.00001,
      type: 'number',
      buttonLabel: 'Deposit NEB',
      validation: [
        {
          message: 'Required',
          required: false,
        },
        {
          message: 'Must be greater than 0',
          greaterThan: 0,
        },
      ],
      key: 'iie2802',
    },
  ],
}

export const withdrawEth = {
  name: 'withdrawEth',
  currency: 'eth',
  key: 'euw8392',
  fields: [
    {
      componentType: 'NumberInput',
      label: 'ETH',
      name: 'withdrawEth',
      fullWidth: true,
      min: 0.00001,
      step: 0.00001,
      type: 'number',
      buttonLabel: 'Withdraw ETH',
      validation: [
        {
          message: 'Required',
          required: false,
        },
        {
          message: 'Must be greater than 0',
          greaterThan: 0,
        },
      ],
      key: 'dew9320',
    },
  ],
}

export const withdrawNeb = {
  name: 'withdrawNeb',
  currency: 'neb',
  key: 'nvn4892',
  fields: [
    {
      componentType: 'NumberInput',
      label: 'NEB',
      name: 'withdrawNeb',
      fullWidth: true,
      min: 0.00001,
      step: 0.00001,
      type: 'number',
      buttonLabel: 'Withdraw NEB',
      validation: [
        {
          message: 'Required',
          required: false,
        },
        {
          message: 'Must be greater than 0',
          greaterThan: 0,
        },
      ],
      key: 'fgo4821',
    },
  ],
}

export const buyOrder = {
  name: 'buyOrder',
  currency: 'eth',
  key: 'cll3820',
  fields: [
    {
      componentType: 'NumberInput',
      label: 'NEB Purchase Quantity',
      name: 'nebQuantity',
      fullWidth: true,
      min: 0.00001,
      step: 0.00001,
      type: 'number',
      validation: [
        {
          message: 'Required',
          required: true,
        },
        {
          message: 'Must be greater than 0',
          greaterThan: 0,
        },
        {
          message: 'Purchase Quantity and Bid Price must be valid',
          dependentField: 'bidPrice',
        },
      ],
      key: 'cnn3020',
    },
    {
      componentType: 'NumberInput',
      label: 'Bid Price ETH / NEB',
      name: 'bidPrice',
      fullWidth: true,
      min: 0.00001,
      step: 0.00001,
      type: 'number',
      validation: [
        {
          message: 'Required',
          required: true,
        },
        {
          message: 'Must be greater than 0',
          greaterThan: 0,
        },
        {
          message: 'Purchase Quantity and Bid Price must be valid',
          dependentField: 'nebQuantity',
        },
      ],
      key: 'ewo5802',
    },
  ],
}

export const sellOrder = {
  name: 'sellOrder',
  currency: 'eth',
  key: 'dsk3820',
  fields: [
    {
      componentType: 'NumberInput',
      label: 'NEB Sale Quantity',
      name: 'nebQuantity',
      fullWidth: true,
      min: 0.00001,
      step: 0.00001,
      type: 'number',
      validation: [
        {
          message: 'Required',
          required: true,
        },
        {
          message: 'Must be greater than 0',
          greaterThan: 0,
        },
        {
          message: 'Sale Quantity and Ask Price must be valid',
          dependentField: 'askPrice',
        },
      ],
      key: 'lls3883',
    },
    {
      componentType: 'NumberInput',
      label: 'Ask Price ETH / NEB',
      name: 'askPrice',
      fullWidth: true,
      min: 0.00001,
      step: 0.00001,
      type: 'number',
      validation: [
        {
          message: 'Required',
          required: true,
        },
        {
          message: 'Must be greater than 0',
          greaterThan: 0,
        },
        {
          message: 'Sale Quantity and Ask Price must be valid',
          dependentField: 'nebQuantity',
        },
      ],
      key: 'dei3997',
    },
  ],
}
