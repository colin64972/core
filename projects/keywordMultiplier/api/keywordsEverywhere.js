import { calculateTrialPrice } from '@colin30/shared/logic/keywordMultiplier'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { errorConstants } from '@colin30/shared/serverless/errorConstants'
import { proxyServiceError } from '@colin30/shared/serverless/proxyServiceError'
import { fetchKeMeta, fetchKeVolumes } from './fetchers'
import { getTrialById, updateTrialWithPaymentAndVolumes } from './trials'
import Stripe from 'stripe'

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
    const body = JSON.parse(eventBody)

    const trial = await getTrialById(body.orderRequest.trialId)

    const serverPrice = calculateTrialPrice(
      trial.trialProduct.billableKeywords.length
    )

    if (serverPrice.total !== body.orderRequest.price.total)
      throw Error(errorConstants.PAYMENT.PRICE_MISMATCH.ERROR_CODE)

    const { paymentIntents } = new Stripe(stripeSecret)

    const paymentIntent = await paymentIntents.create({
      amount: parseInt(serverPrice.total * 100),
      currency: 'cad'
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
    const body = JSON.parse(eventBody)

    const trial = await getTrialById(body.trialId)

    const metrics = await fetchKeVolumes(
      body.country,
      body.currency,
      body.dataSource,
      trial.trialProduct.billableKeywords
    )

    if (!metrics.credits) throw Error('order fail')

    const update = await updateTrialWithPaymentAndVolumes(
      trial.id,
      body.paymentId,
      body.country,
      body.currency,
      body.dataSource,
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
    return {
      statusCode: 500,
      error
    }
  }
}
