const setServer = (port, baseDir, files) => ({
  port,
  files,
  server: {
    baseDir
  }
})

module.exports = setServer
