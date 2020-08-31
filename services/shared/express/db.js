exports.connectDb = async (dbName, mongooseConnect) => {
  let uri = `mongodb://localhost:27017/${dbName}`
  let options = {
    bufferCommands: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
  try {
    const db = await mongooseConnect(uri, options)
    return db.connections[0].name
  } catch (error) {
    throw error
  }
}
