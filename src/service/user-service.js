const db = require("../application/connection");
const bcrypt = require("bcrypt");
const response = require("../utils/user-response");
const { v4: uuid } = require('uuid');


//user register
const register = async (req, res) => {
  let { username, password, name } = req;
  password = await bcrypt.hash(password, 10);
  //cek username apakah sudah ada di db
  const sqlCountUser = `SELECT COUNT(*) as hasil FROM users WHERE username = ?`;
  db.query(sqlCountUser, [username], (err, results, fields) => {

    const userExists = results[0].hasil === 1;
    if (!userExists) {
      //masukan user ke database
      const sqlInsertUser = `INSERT INTO users (username, password, name) VALUES (?, ?, ?)`;
      db.query(sqlInsertUser,[username, password, name],(error, results, fields) => {
          const user = {
            username: username,
            password:password,
            name: name
          };
         res.status(200).json({
          data:user
         })
        }
      );
    } else {
      res.status(200).json({
        errors:"data is already exist"
       })
    }
  });
};

//user login
const login = (req,res) => {
  const findUser = `SELECT * FROM users WHERE username = ?`;

  db.query(findUser,[req.username],(error, fields)=>{
        // jika datanya ada
        if(fields[0]){
            const isLoginValid =  bcrypt.compare(req.password, fields[0].password)
            if(!isLoginValid){
                res.status(401).json({errors:"username or password is wrong"})
            }
            const token = uuid().toString()
  
            const sql = "UPDATE users SET token = ? WHERE username = ?"
            db.query(sql, [token, fields[0].username],(error, fields)=>{
                res.status(200).json({
                  token: token
                })
            })
        }else{
          res.status(401).json({errors:"username or password is wrong"})
        }
  })
};

//get current user
const get = (username, res)=>{
    const sql = `SELECT * FROM users WHERE username = ?`
    db.query(sql, [username], (error, fields)=>{
        if(fields[0]){
            res.status(200).json({data: fields[0]})
        }else{
            res.status(404).json({
              errors: "user is not found"
            })
        }
    })
    
}

//delete current user
const logout = (username, res)=>{
    let sql = `SELECT * FROM users WHERE username = ?`
    db.query(sql, [username], (error, fields)=>{
        if(fields[0]){
            sql = `UPDATE users SET token = null WHERE username = ?`
            db.query(sql, [username],(error, fields)=>{
              res.status(200).json({
                data:"OK"
              }) 
            })
        }else{
            res.status(404).json({
              errors:"user is not found"
            })
        }
    })
}

//update current users

//list users
const users = (res)=>{
  let sql = `SELECT * FROM users`
  db.query(sql, (err, fields)=>{
    console.log(fields);
    res.status(200).json({data:fields})
  })
}

module.exports = {
  register,
  login,
  get,
  logout,
  users
};
