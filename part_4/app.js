const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const router = require('./controllers/blog')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body - :req[content-length]'))

app.use('/api', router)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
