import colors from 'colors'
import Stripe from 'stripe'
import { BodyEvent } from './interfaces'

export const preOrder = async (body: BodyEvent, reqId: string) => {
  let stripeSecret = process.env.STRIPE_SECRET_KEY_LIVE

  if (process.env.IS_LOCAL || process.env.IS_OFFLINE) {
    stripeSecret = process.env.STRIPE_SECRET_KEY_TEST
  }

  const { paymentIntents } = new Stripe(stripeSecret, {
    apiVersion: '2020-08-27'
  })

  const paymentIntent: Stripe.PaymentIntent = await paymentIntents.create({
    amount: parseInt(process.env.SHEET_PRICE),
    currency: 'cad',
    description: `${process.env.READABLE_PROJECT_NAME} sheet transform order ${reqId}`,
    metadata: {
      orderId: reqId
    }
  })

  return paymentIntent.client_secret
}
