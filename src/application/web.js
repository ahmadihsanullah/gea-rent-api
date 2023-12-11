const express = require("express")
const web = express()
const bodyParser = require("body-parser")
const {publicRouter} = require('../router/public-api')

web.use(bodyParser.json())
web.use(publicRouter)

module.exports = { web }
