const express = require("express");
const userController = require("../controller/user-controller.js");
const authMiddleware = require('../middleware/auth-middleware.js')

const userRouter = express.Router()
userRouter.use(authMiddleware)

//USER API
//1. GET one user
userRouter.get('/api/users/current', userController.get);
//2. Delete user
userRouter.delete('/api/users/logout', userController.logout);
//3. Get all users
userRouter.get('/api/users', userController.users);
//4. update users
userRouter.patch('/api/users/update', userController.update);

module.exports = {
    userRouter
}