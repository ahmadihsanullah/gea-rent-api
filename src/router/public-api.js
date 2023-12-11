const express = require("express");
const userController = require("../controller/user-controller.js");
    
const publicRouter =  express.Router();
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);

module.exports = {
    publicRouter
}