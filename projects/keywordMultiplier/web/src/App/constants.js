export const constants = {
  SETS_FORM_NAME: 'setsForm',
  EXCEL_TEXT_QUALIFIER: "'",
  VOLUME_SPINNER: 'volume',
  MATCHTYPES: {
    BROAD: 'broad',
    BROAD_MODIFIER: 'modifier',
    PHRASE: 'phrase',
    EXACT: 'exact'
  },
  WHITESPACE_OPTIONS: {
    DISABLED: {
      LABEL: 'Disabled',
      VALUE: 0
    },
    NONE: {
      LABEL: 'No Spaces',
      VALUE: 1
    },
    HYPHEN: {
      LABEL: 'Hyphen -',
      VALUE: 2
    },
    UNDERSCORE: {
      LABEL: 'Underscore _',
      VALUE: 3
    }
  },
  REPLACEMENT_CODE: '#@$@#',
  VOLUME_DATA: {
    VOLUME: {
      LABEL: 'Volume',
      VALUE: 'vol'
    },
    CPC: {
      LABEL: 'CPC',
      VALUE: 'cpc'
    },
    COMP: {
      LABEL: 'Comp',
      VALUE: 'competition'
    },
    TREND: {
      LABEL: 'Trend',
      VALUE: 'trend'
    }
  },
  DEFAULT_VOLUME_REQUEST_COUNTRY: 'us',
  DEFAULT_VOLUME_REQUEST_CURRENCY: 'usd',
  DEFAULT_VOLUME_REQUEST_DATASOURCE: 'gkp',
  NOTICE: {
    TIMEOUT_DELAY: process.env.NODE_ENV === 'development' ? 10000 : 5000,
    TIMEOUT_HEIGHT: 4,
    KINDS: {
      SIMPLE: 0,
      CHOICE: 1
    },
    BGS: {
      PASS: 'pass',
      WARN: 'warn',
      FAIL: 'fail'
    },
    RESPONSES: {
      ACCEPT: 'accept',
      REJECT: 'reject',
      TIMEOUT: 'timeout'
    }
  },
  DEFAULT_IP: 'localhost',
  URLS: {
    HOME: '/',
    NOT_FOUND: '*',
    TOS: '/terms-of-service',
    PP: '/privacy-policy',
    FEEDBACK: '/feedback'
  }
}
