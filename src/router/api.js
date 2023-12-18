const express = require("express");
const userController = require("../controller/user-controller.js");
const authMiddleware = require('../middleware/auth-middleware.js');
const upload = require("../middleware/upload-image-middleware.js");

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
userRouter.patch('/api/users/update',upload.single('profile'), userController.update);
//5. search user
userRouter.get('/api/users/search', userController.searchUser);

module.exports = {
    userRouter
}