const express = require("express");
const userController = require("../controller/user-controller.js");
const adminController = require("../controller/admin-controller.js");

const publicRouter =  express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.post('/api/users/loginTokos', userController.loginTokos);
publicRouter.post('/api/admin/login', adminController.login);

module.exports = {
    publicRouter
}