const express = require("express")
const web = express()
const bodyParser = require("body-parser")
const {publicRouter} = require('../router/public-api')
const {userRouter} = require('../router/api')

web.use(bodyParser.json())
web.use(publicRouter)
web.use(userRouter)

module.exports = { web }
