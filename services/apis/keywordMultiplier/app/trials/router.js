const express = require('express')
const TrialsModel = require('./model')

const trialsRouter = express.Router()

const getAll = async (req, res, next) => {
  try {
    let docs = await TrialsModel.find({})
    return res.json(docs)
  } catch (err) {
    return next(err)
  }
}

trialsRouter.route('/').get(getAll)

module.exports = trialsRouter
