const keywordMultiplier = {
  faviconHref: 'https://cdn.nebocat.ca/favicon.ico',
  bundles: [
    'https://cdn.nebocat.ca/keyword-multiplier/src.js',
    'https://cdn.nebocat.ca/keyword-multiplier/vendors~src.js'
  ]
}

const nebocatCa = {
  faviconHref: 'https://cdn.nebocat.ca/favicon.ico',
  bundles: [
    'https://cdn.nebocat.ca/nebocat-ca/src.js',
    'https://cdn.nebocat.ca/nebocat-ca/vendors~src.js'
  ]
}

export const templateLocals = {
  'keyword-multiplier': {
    home: {
      title: 'Keyword Multiplier | Nebocat',
      ...keywordMultiplier
    },
    error: {
      title: 'Error | Keyword Multiplier',
      ...keywordMultiplier
    }
  },
  'nebocat-ca': {
    home: {
      title: 'Nebocat',
      ...nebocatCa
    },
    error: {
      title: 'Error | Nebocat',
      ...nebocatCa
    }
  }
}
