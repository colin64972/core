export const scan = (event, context, callback) => {
  const result = [
    {
      id: 'asdf',
      ipAddress: '1.2.4.5',
      sets: {
        set2: ['hello', 'goodbye'],
        set4: ['sally', 'jim']
      }
    }
  ]
  const response = {
    statusCode: 200,
    body: JSON.stringify(result)
  }

  console.log(event, context, callback)

  return callback(null, response)
}
