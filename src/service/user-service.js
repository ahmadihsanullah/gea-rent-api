const db = require("../application/connection");
const bcrypt = require("bcrypt");
const response = require("../utils/user-response");
const { v4: uuid } = require('uuid');


const register = async (req, res) => {
  let { username, password, name } = req;
  password = await bcrypt.hash(password, 10);
  //cek username apakah sudah ada di db
  const sqlCountUser = `SELECT COUNT(*) as hasil FROM users WHERE username = ?`;
  db.query(sqlCountUser, [username], (err, results, fields) => {
    if (err) {
      return response(500, "error", "internal server error", res);
    }

    const userExists = results[0].hasil === 1;
    if (!userExists) {
      //masukan user ke database
      const sqlInsertUser = `INSERT INTO users (username, password, name) VALUES (?, ?, ?)`;
      db.query(
        sqlInsertUser,
        [username, password, name],
        (error, results, fields) => {
          if (error) {
            return response(500, "error", "internal server error", res);
          }
          const user = {
            username: username,
            password: password,
            name: name,
          };
          return response(200, user, "username is already exist", res);
        }
      );
    } else {
      return response(400, "error", "username is already exist", res);
    }
  });
};

const login = (req,res) => {
  const findUser = `SELECT * FROM users WHERE username = ?`;

  db.query(findUser,[req.username],(error, fields)=>{
        if(error) return response(500, "error","internal server error", res)

        // jika datanya ada
        if(fields[0]){
            const isLoginValid =  bcrypt.compare(req.password, fields[0].password)
            if(!isLoginValid){
                return response(401, "error","username or password is wrong", res)
            }
            const token = uuid().toString()
  
            const sql = "UPDATE users SET token = ? WHERE username = ?"
            db.query(sql, [token, fields[0].username],(error, fields)=>{
                if(error) return response(500, "error","internal server error", res)
                return response(200, {"token": token},"token is active", res)
            })
        }else{
            return response(401, "error","username or password wrong", res)
        }
  })
};

const get = (username, res)=>{
    const sql = `SELECT * FROM users WHERE username = ?`
    db.query(sql, [username], (error, fields)=>{
        if(error) return response(500, "error", "internal server error", res);
        if(fields[0]){
            return response(200, {data: fields[0]}, "current user", res)
        }else{
            return response(404, "error","user is not found", res)
        }
    })
    
}

const logout = async(username)=>{
    username = validate(getUserValidation, username)

    const user = prismaClient.user.findUnique({
        where:{
            username:username
        }
    })

    if(!user){
        throw new ResponseError(404, "user is not found")
    }

    return prismaClient.user.update({
        where:{
            username:username
        },
        data:{
            token:null
        },
        select:{
            username:true
        }
    })
}



module.exports = {
  register,
  login,
  get,
  logout
};
