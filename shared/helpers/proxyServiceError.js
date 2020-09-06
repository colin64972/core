const setDynamoConstants = require('../constants/dynamodb')

const dynamoConstants = setDynamoConstants()

const setErrorBody = (message, errorObject = null) => {
  let builtError = {
    name: dynamoConstants.ERRORS.SERVICE.GENERAL.MESSAGE,
    message
  }

  if (errorObject) {
    builtError = {
      name: errorObject.name,
      message: errorObject.message,
      ...errorObject
    }
  }

  return JSON.stringify(builtError, null, 2)
}

const proxyServiceError = error => {
  console.error(dynamoConstants.ERRORS.SERVICE.GENERAL.MESSAGE, error)
  switch (error.message) {
    case dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
      return {
        statusCode: dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
        body: setErrorBody(dynamoConstants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
      }
    case dynamoConstants.ERRORS.DYNAMODB.UPDATE_FAIL.ERROR_CODE:
      return {
        statusCode: dynamoConstants.ERRORS.DYNAMODB.UPDATE_FAIL.STATUS_CODE,
        body: setErrorBody(dynamoConstants.ERRORS.DYNAMODB.UPDATE_FAIL.MESSAGE)
      }
    default:
      return {
        statusCode:
          error.statusCode ||
          dynamoConstants.ERRORS.SERVICE.GENERAL.STATUS_CODE,
        body: setErrorBody(null, error)
      }
  }
}

export default proxyServiceError
