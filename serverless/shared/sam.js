exports.setSamHandler = (app, samProxy, samCreateServer) => (
  event,
  context
) => {
  context.callbackWaitsForEmptyEventLoop = false
  return samProxy(createServer(app), event, context)
}
