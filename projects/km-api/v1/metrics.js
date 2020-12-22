import Stripe from 'stripe'

import { calculateTrialPrice } from '@cjo3/shared/logic/km'
import { constants } from '@cjo3/shared/raw/constants/km'
import { errorConstants } from '@cjo3/shared/serverless/errorConstants'
import { proxyServiceError } from '@cjo3/shared/serverless/proxyServiceError'
import { sendMessage } from '@cjo3/shared/serverless/sendSms'

import { fetchKeMeta, fetchKeVolumes } from './fetchers'
import { getTrialById, updateTrialWithPaymentAndVolumes } from './trials'

export const getMeta = async queryStringParameters => {
  const { resource } = queryStringParameters

  let resources = constants.ENDPOINTS[resource]

  const promises = resources.map(path => fetchKeMeta(path))

  try {
    const responses = await Promise.all(promises)

    const data = responses.reduce((acc, cur) => {
      let temp = acc
      const { url } = cur.config
      temp[url.substring(url.lastIndexOf('/') + 1)] = cur.data
      return temp
    }, {})

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    console.error('getKeData', error, error.response?.status)

    let statusCode = 500

    if (error.response?.status) {
      statusCode = error.response.status
    }

    return {
      statusCode,
      body: JSON.stringify(error.message)
    }
  }
}

export const preOrder = async eventBody => {
  let stripeSecret = process.env.STRIPE_SECRET_KEY_LIVE

  if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
    stripeSecret = process.env.STRIPE_SECRET_KEY_TEST
  }

  try {
    const trial = await getTrialById(eventBody.orderRequest.trialId)

    const billableCount = trial.trialProduct.billableKeywords.length

    const serverPrice = calculateTrialPrice(billableCount)

    if (serverPrice.total !== eventBody.orderRequest.price.total)
      throw Error(errorConstants.PAYMENT.PRICE_MISMATCH.ERROR_CODE)

    const { paymentIntents } = new Stripe(stripeSecret)

    const paymentIntent = await paymentIntents.create({
      amount: parseInt(serverPrice.total * 100),
      currency: 'cad',
      description: `${
        process.env.READABLE_PROJECT_NAME
      } purchase of ${billableCount} keyword metric${
        billableCount > 1 ? 's' : ''
      }`,
      metadata: {
        billableCount,
        billableKeywords: JSON.stringify(trial.trialProduct.billableKeywords),
        country: eventBody.readableKeOptions.country,
        currency: eventBody.readableKeOptions.currency,
        dataSource: eventBody.readableKeOptions.dataSource,
        resultId: trial.id
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(paymentIntent)
    }
  } catch (error) {
    return proxyServiceError(error)
  }
}

export const getVolumes = async eventBody => {
  try {
    const trial = await getTrialById(eventBody.trialId)

    const metrics = await fetchKeVolumes(
      eventBody.country,
      eventBody.currency,
      eventBody.dataSource,
      trial.trialProduct.billableKeywords
    )

    if (!metrics.credits) throw Error(errorConstants.KE.ERROR_CODE)

    const update = await updateTrialWithPaymentAndVolumes(
      trial.id,
      eventBody.paymentId,
      eventBody.country,
      eventBody.currency,
      eventBody.dataSource,
      metrics.data
    )

    return {
      statusCode: 200,
      body: JSON.stringify({
        credits: metrics.credits,
        updatedTrial: {
          ...trial,
          ...update
        }
      })
    }
  } catch (error) {
    return proxyServiceError(error)
  }
}

export const alertLowCredits = async eventBody => {
  try {
    const { credits } = eventBody

    const res = await sendMessage(
      `ke credits low: ${credits} credits remaining. refill soon.`,
      process.env.SNS_ARN
    )

    if (typeof res === 'string')
      return {
        statusCode: 202
      }

    throw Error(errorConstants.sns.messageFail.ERROR_CODE)
  } catch (error) {
    return proxyServiceError(error)
  }
}
