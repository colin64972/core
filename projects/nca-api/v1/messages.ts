export async function sendMessage(body) {
  console.log('LOG sendMessage'.yellow, body)
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}
