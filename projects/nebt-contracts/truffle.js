require('core-js/stable')
require('regenerator-runtime/runtime')
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
  networks: {
    development: {
      host: process.env.LOCAL_HOST,
      port: process.env.LOCAL_PORT,
      network_id: '5777',
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEYS.split(','),
          process.env.INFURA_ENDPOINT,
          0,
          3
        ),
      network_id: 4,
      gas: 6500000,
      gasPrice: 100000000000,
    },
  },
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
