const setDynamoConstants = () => {
  const state = {
    port: 8000,
    region: 'localhost'
  }
  return {
    LOCAL: {
      REGION: state.region,
      PORT: state.port,
      ENDPOINT: `http://${state.region}:${state.port}`
    },
    ERRORS: {
      DYNAMODB: {
        NO_ITEMS: {
          ERROR_CODE: 'JL88GQV4000000004016543941787648',
          STATUS_CODE: 400,
          MESSAGE: 'no items'
        },
        UPDATE_FAIL: {
          ERROR_CODE: 'KU23TWG20000000006738694853623808',
          STATUS_CODE: 500,
          MESSAGE: 'update timestamps mismatch'
        }
      }
    }
  }
}

module.exports = setDynamoConstants
