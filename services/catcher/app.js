const express = require('express')
const { getFirstName, getLastName } = require('@colin30/services-shared')

const app = express()

app.get('/', (req, res) => {
  console.log(process.env)
  return res.json(getFirstName())
})

app.get('/*', (req, res) => {
  console.log(process.env)
  return res.json(getLastName())
})

module.exports = app
