const express = require("express")
const cors = require("cors");
const web = express()
const bodyParser = require("body-parser")
const {publicRouter} = require('../router/public-api')
const {userRouter} = require('../router/api')
const {adminRouter} = require('../router/api')

web.use(cors({
    origin: 'http://localhost:5173'
}))

web.use(bodyParser.json())
web.use(publicRouter)
web.use(userRouter)
web.use(adminRouter)

module.exports = { web }
