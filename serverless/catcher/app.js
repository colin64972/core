import express from 'express'
import {
  getFirstName,
  getLastName,
  getPassword
} from '@colin30/serverless-shared'

const app = express()

app.get('/', (req, res) => res.json(`${getFirstName()} ${getLastName()}`))
app.get('/*', (req, res) => res.json(getPassword()))

export default app
