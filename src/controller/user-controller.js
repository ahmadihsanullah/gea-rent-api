const userService = require('../service/user-service')
const response = require('../utils/user-response')

const register = (req, res)=>{
    try {
        const result =  userService.register(req.body, res)
        return result
    } catch (e) {
        response(500, "error", "Internal Server Error", res)
    }
}

const login = (req, res)=> {
    try {
        const result =  userService.login(req.body, res)
        return result
    } catch (e) {
        response(500, "error", "Internal Server Error", res)
    }
}

const get = (req, res, next)=>{
    try {
        const username = req.user.username
        const result =  userService.get(username, res)
        return result
    } catch (e) {
        next(e)
    }
}

module.exports = {
    register,
    login,
    get
}