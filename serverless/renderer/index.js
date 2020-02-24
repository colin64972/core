export const getAll = async (event, context, callback) => {
  try {
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

    return callback(null, response)
  } catch (err) {
    console.log(err)
  }
}
