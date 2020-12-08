import SES, { SendEmailRequest } from 'aws-sdk/clients/ses'
import { messageTypeLabels } from '@cjo3/shared/raw/constants/nca'
import { NcaContactFormPost, NcaContactFormRes } from '../index'

const ses = new SES({
  apiVersion: '2010-12-01',
  region: process.env.SES_REGION
})

export async function sendMessage({
  name,
  sender,
  typeIndex,
  message,
  host,
  pathname
}: NcaContactFormPost): Promise<NcaContactFormRes> {
  const kindIndex: number = parseInt(typeIndex)

  let messageKind = messageTypeLabels[0]

  if (kindIndex > 0) messageKind = messageTypeLabels[1]
  if (kindIndex > 1) messageKind = messageTypeLabels[2]

  const params: SendEmailRequest = {
    Destination: {
      ToAddresses: [process.env.DEST_EMAIL]
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Name: ${name}\nSender: ${sender}\nMessage Type: ${messageKind}\nMessage: ${message}\nHost: ${host}\nPath: ${pathname}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'NCA Contact Form Message'
      }
    },
    ReplyToAddresses: [sender],
    Source: process.env.SOURCE_EMAIL
  }

  const res = await ses.sendEmail(params).promise()

  if (res.MessageId)
    return {
      statusCode: 204
    }
}
