const db = require('../application/connection')
const bcrypt = require('bcrypt');
const response = require('../utils/user-response');

const register = async(req, res)=>{
    let { username, password, name } = req;
    password = await bcrypt.hash(password, 10);
        
        //cek username apakah sudah ada di db
        const sqlCountUser = `SELECT COUNT(*) as hasil FROM users WHERE username = ?`;
        db.query(sqlCountUser, [username], (err, results, fields) => {
            if (err) {
                return response(500, "error","internal server error", res)
            }

            const userExists = results[0].hasil === 1;
            if (!userExists) {
                //masukan user ke database
                const sqlInsertUser = `INSERT INTO users (username, password, name) VALUES (?, ?, ?)`;
                db.query(sqlInsertUser, [username, password, name], (error, results, fields) => {
                    if (error) {
                        return response(500, "error","internal server error", res) 
                    }
                    const user = {
                        "username" : username,
                        "password" : password,
                        "name" : name
                    }
                    return response(200, user,"username is already exist", res)
                });
            } else {
                return response(400, "error","username is already exist", res)
            }
        });
}

module.exports = {
    register
}