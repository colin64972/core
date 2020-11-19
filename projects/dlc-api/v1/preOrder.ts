import Stripe from 'stripe'
import { BodyEvent } from './interfaces'

export const preOrder = async (body: BodyEvent, reqId: string) => {
  const { paymentIntents } = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
  })

  const paymentIntent: Stripe.PaymentIntent = await paymentIntents.create({
    amount: parseInt(process.env.SHEET_PRICE),
    currency: 'cad',
    description: `${process.env.READABLE_PROJECT_NAME} sheet transform order ${reqId}`,
    metadata: {
      orderId: reqId,
      email: body.email
    }
  })

  return paymentIntent.client_secret
}
