const setConstants = () => {
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
      SERVICE: {
        GENERAL: {
          ERROR_CODE: 'dijijfewgo',
          STATUS_CODE: 500,
          MESSAGE: 'service error'
        }
      },
      DYNAMODB: {
        NO_ITEMS: {
          ERROR_CODE: 'figorvaove',
          STATUS_CODE: 400,
          MESSAGE: 'no items'
        },
        UPDATE_FAIL: {
          ERROR_CODE: 'lolhotoosu',
          STATUS_CODE: 500,
          MESSAGE: 'update timestamps mismatch'
        }
      }
    }
  }
}

const dynamoDbConstants = setConstants()

export default dynamoDbConstants
