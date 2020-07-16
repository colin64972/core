module.exports = {
  EMAIL_ADDRESS: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // HOSTNAME: /^(.*(\.\w+)|localhost)$/,
  // PATHNAME: /^\/(.*)?$/,
  CREDIT_CARD_NUMBER: /^\d{16}$/,
  CREDI_CARD_CODE: /^[1-9]\d{2}$/,
  IP_ADDRESS: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
  DOMAIN_WITH_TLD: /^([a-z.-]+)?(\.\w{2,})$/i
}
