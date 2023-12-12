const userService = require('../service/user-service')
const response = require('../utils/user-response')

const register = (req, res)=>{
        return  userService.register(req.body, res)
}

const login = (req, res)=> {
        return userService.login(req.body, res)
}

const get = (req, res, next)=>{
    try {
        const username = req.user.username
        return userService.get(username, res)
    } catch (e) {
        next(e)
    }
}

const logout = (req, res, next)=>{
    try{
        return userService.logout(req.user.username, res)
    }catch(e){
        next(e)
    }
}

const users = (req, res)=> {
    return userService.users(res)
}
module.exports = {
    register,
    login,
    get,
    logout,
    users
}