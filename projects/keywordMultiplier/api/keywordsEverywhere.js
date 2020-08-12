import { calculateTrialPrice } from '@colin30/shared/logic/keywordMultiplier'
import { constants } from '@colin30/shared/raw/constants/keywordMultiplier'
import { errorConstants } from '@colin30/shared/serverless/errorConstants'
import { proxyServiceError } from '@colin30/shared/serverless/proxyServiceError'
import { fetchKeMeta, fetchKeMetrics } from './fetchers'
import { getTrialById } from './trials'
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
  try {
    const body = JSON.parse(eventBody)

    const trial = await getTrialById(body.orderRequest.trialId)

    const serverPrice = calculateTrialPrice(
      trial.trialProduct.billableKeywords.length
    )

    if (serverPrice.total !== body.orderRequest.price.total)
      throw Error(errorConstants.PAYMENT.PRICE_MISMATCH.ERROR_CODE)

    const { paymentIntents } = new Stripe(process.env.STRIPE_TEST_KEY)

    const paymentIntent = await paymentIntents.create({
      amount: parseInt(serverPrice.total * 100),
      currency: 'cad'
    })

    return {
      statusCode: 200,
      body: JSON.stringify(paymentIntent)
    }

    const metrics = await fetchKeMetrics(
      body.country,
      body.currency,
      body.dataSource,
      trial.trialProduct.billableKeywords
    )

    if (!metrics.credits) throw Error('order fail')

    return {
      statusCode: 200,
      body: JSON.stringify(metrics)
    }
  } catch (error) {
    return proxyServiceError(error)
  }
}
