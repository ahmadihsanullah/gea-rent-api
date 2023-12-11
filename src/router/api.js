const express = require("express");
const userController = require("../controller/user-controller.js");
const authMiddleware = require('../middleware/auth-middleware.js')

const userRouter = express.Router()
userRouter.use(authMiddleware)

//USER API
userRouter.get('/api/users/current', userController.get);

module.exports = {
    userRouter
}