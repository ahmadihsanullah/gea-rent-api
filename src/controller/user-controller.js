const userService = require('../service/user-service')
const response = require('../utils/user-response')

const register = async(req, res)=>{
    try {
        const result = userService.register(req.body, res)
        return result
    } catch (e) {
        response(500, "error", "Internal Server Error", res)
    }
}

module.exports = {
    register
}