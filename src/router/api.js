const express = require("express");
const userController = require("../controller/user-controller.js");
const adminController = require("../controller/admin-controller.js");
const authMiddleware = require('../middleware/auth-middleware.js');
const upload = require("../middleware/upload-image-middleware.js");

const userRouter = express.Router()
const adminRouter = express.Router()
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

// Admin API
// Users
// 1. GET all users in admin
adminRouter.get('/api/admin/users', adminController.usersAdmin);
// 2. UPDATE user
adminRouter.patch('/api/admin/users/update', upload.single('profile'), adminController.update);
// 3. Delete User
adminRouter.delete('/api/admin/logout', adminController.logout);

// Tokos

module.exports = {
    userRouter,
    adminRouter
}