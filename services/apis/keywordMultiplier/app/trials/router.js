const express = require('express')

const trialsRouter = express.Router()

const getAll = async (req, res, next) => {
  console.log(process.env)
  return res.json('getAll')
}

trialsRouter.route('/').get(getAll)

module.exports = trialsRouter
