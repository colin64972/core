module.exports = {
  EMAIL_ADDRESS: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  CREDIT_CARD_NUMBER: /^\d{16}$/,
  CREDI_CARD_CODE: /^[1-9]\d{2}$/,
  IP_ADDRESS: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
  LINE_INCLUDES_TLD: /(.*)(\.[a-z]{1}[a-z0-9\-]{1,23})/gi,
  APP_PATH_MATCH: /^(\/apps\/)([\w\-]+)(.*)$/i,
  WWW_HOST: /^(https?\:\/{2})?[w]{3}\./i,
  FILE_WITH_EXT: /\.[a-z]{3,}$/i
}
