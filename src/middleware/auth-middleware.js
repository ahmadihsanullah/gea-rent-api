const db = require('../application/connection')
const response = require('../utils/user-response')

const authMiddleware = async (req, res, next)=>{
    const token = req.get("Authorization") //mencek header body nya jika ada authorization
    if(!token){
        response(401, "errors", "Unauthorized", res)
    }else{
        const sql = `SELECT * FROM users WHERE token = '${token}'`
        db.query(sql,(error, fields)=>{
            if(fields[0]){
                req.user = fields[0]
                next()
            }else{
                response(401, "errors", "Unauthorized", res)
            }
        })
    }
}

module.exports = authMiddleware