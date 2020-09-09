export const constants = {
  SETS_FORM_NAME: 'sets',
  EXCEL_TEXT_QUALIFIER: "'",
  MATCHTYPES: {
    BROAD: 'broad',
    BROAD_MODIFIER: 'modifier',
    PHRASE: 'phrase',
    EXACT: 'exact'
  },
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
  URLS: {
    HOME: '/',
    NOT_FOUND: '*',
    TOS: '/terms-of-service',
    PP: '/privacy-policy',
    FEEDBACK: '/feedback'
  }
}
