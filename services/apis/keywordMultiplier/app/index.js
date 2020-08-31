require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { connectDb } = require('@colin30/services-shared/express/db')
const trialsRouter = require('./trials/router')

const app = express()

connectDb(process.env.DB_NAME, mongoose.connect)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/trials', trialsRouter)

module.exports = app
