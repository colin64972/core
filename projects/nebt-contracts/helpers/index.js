const web3 = require('web3')

exports.setTokens = n => new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'))

exports.setEther = n => this.setTokens(n)

exports.wait = seconds => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}