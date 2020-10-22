export const serveAppPage = requestedApp => {
  return {
    statusCode: 200,
    body: JSON.stringify(requestedApp)
  }
}
