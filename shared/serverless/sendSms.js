import AWS from 'aws-sdk'
import { errorConstants } from './errorConstants'

const sns = new AWS.SNS({
  apiVersion: '2010-03-31',
  region: process.env.REGION
})

export const sendMessage = async (Message, TargetArn) => {
  try {
    const params = {
      Message,
      TargetArn
    }
    const res = await sns.publish(params).promise()
    if (res?.MessageId) return res.MessageId
  } catch (error) {
    console.error('sendMessage', error)
    return error
  }
}
