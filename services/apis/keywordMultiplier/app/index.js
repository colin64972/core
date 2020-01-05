const express = require('express')
const trialsRouter = require('./trials/router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/trials', trialsRouter)

module.exports = app
