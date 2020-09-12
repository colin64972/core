import { dynamoDbConstants } from '../raw/constants/dynamoDb'
import { errorConstants } from './errorConstants'

const setErrorBody = (message, errorObject = null) => {
  let builtError = {
    name: dynamoDbConstants.ERRORS.SERVICE.GENERAL.MESSAGE,
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

export const proxyServiceError = error => {
  console.error(dynamoDbConstants.ERRORS.SERVICE.GENERAL.MESSAGE, error)
  switch (error.message) {
    case dynamoDbConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE:
      return {
        statusCode: dynamoDbConstants.ERRORS.DYNAMODB.NO_ITEMS.STATUS_CODE,
        body: setErrorBody(dynamoDbConstants.ERRORS.DYNAMODB.NO_ITEMS.MESSAGE)
      }
    case dynamoDbConstants.ERRORS.DYNAMODB.UPDATE_FAIL.ERROR_CODE:
      return {
        statusCode: dynamoDbConstants.ERRORS.DYNAMODB.UPDATE_FAIL.STATUS_CODE,
        body: setErrorBody(
          dynamoDbConstants.ERRORS.DYNAMODB.UPDATE_FAIL.MESSAGE
        )
      }
    case errorConstants.PAYMENT.PRICE_MISMATCH.ERROR_CODE:
      return {
        statusCode: errorConstants.PAYMENT.PRICE_MISMATCH.STATUS_CODE,
        body: setErrorBody(errorConstants.PAYMENT.PRICE_MISMATCH.MESSAGE)
      }
    case errorConstants.sns.messageFail.ERROR_CODE:
      return {
        statusCode: errorConstants.sns.messageFail.STATUS_CODE,
        body: setErrorBody(errorConstants.sns.messageFail.MESSAGE)
      }
    default:
      return {
        statusCode:
          error.statusCode ||
          dynamoDbConstants.ERRORS.SERVICE.GENERAL.STATUS_CODE,
        body: setErrorBody(null, error)
      }
  }
}
