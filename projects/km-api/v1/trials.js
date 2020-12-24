import AWS from 'aws-sdk'

import { processTrial } from '@cjo3/shared/logic/km'
import { dynamoDbConstants } from '@cjo3/shared/raw/constants/dynamoDb'
import { IP_ADDRESS } from '@cjo3/shared/raw/constants/regex'
import { createHashId } from '@cjo3/shared/react/helpers'
import { proxyServiceError } from '@cjo3/shared/serverless/proxyServiceError'

import { fetchGeoIp } from './fetchers'

const dbOptions = {}

if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
  dbOptions.region = dynamoDbConstants.LOCAL.REGION
  dbOptions.endpoint = dynamoDbConstants.LOCAL.ENDPOINT
}

const docClient = new AWS.DynamoDB.DocumentClient(dbOptions)

export const createTrial = async eventBody => {
  try {
    let { ipAddress, country, sets } = eventBody

    let geoIp

    if (IP_ADDRESS.test(ipAddress)) {
      geoIp = await fetchGeoIp(ipAddress)
    }

    const timestamp = new Date().getTime()

    const trialData = {
      id: createHashId(),
      geoIp,
      sets,
      createdAt: timestamp,
      updatedAt: timestamp
    }

    const trialProduct = processTrial(trialData.sets)

    const options = {
      TableName: process.env.TABLE_NAME,
      Item: {
        ...trialData,
        trialProduct
      }
    }

    await docClient.put(options).promise()

    return {
      statusCode: 201,
      body: JSON.stringify(options.Item)
    }
  } catch (error) {
    return proxyServiceError(error)
  }
}

export const getTrialById = async id => {
  try {
    const options = {
      TableName: process.env.TABLE_NAME,
      Key: { id }
    }

    const result = await docClient.get(options).promise()

    if (!result?.Item)
      throw Error(dynamoDbConstants.ERRORS.DYNAMODB.NO_ITEMS.ERROR_CODE)

    return result.Item
  } catch (error) {
    return error
  }
}

export const updateTrialWithPaymentAndVolumes = async (
  trialId,
  paymentId,
  country,
  currency,
  dataSource,
  volume
) => {
  try {
    const timestamp = new Date().getTime()

    const options = {
      TableName: process.env.TABLE_NAME,
      Key: {
        id: trialId
      },
      ExpressionAttributeNames: {
        '#m': 'metrics',
        '#p': 'paymentId',
        '#u': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':m': {
          country,
          currency,
          dataSource,
          volume
        },
        ':p': paymentId,
        ':u': timestamp
      },
      ConditionExpression:
        'attribute_not_exists(#p) AND attribute_not_exists(#m)',
      UpdateExpression: 'SET #m = :m, #p = :p, #u = :u',
      ReturnValues: 'UPDATED_NEW'
    }

    const result = await docClient.update(options).promise()

    if (result?.Attributes.updatedAt === timestamp) return result.Attributes
  } catch (error) {
    return error
  }
}
