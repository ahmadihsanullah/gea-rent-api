const express = require("express");
const userController = require("../controller/user-controller.js");
    
const publicRouter =  express.Router();
publicRouter.post('/api/users', userController.register);

module.exports = {
    publicRouter
}