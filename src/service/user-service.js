const db = require("../application/connection");
const bcrypt = require("bcrypt");
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
const login =  (req,res) => {
  const {username, password} = req
  const findUser = `SELECT * FROM users WHERE username = ? `;

  db.query(findUser,[username], async(error, result)=>{
        // jika datanya tidak ada
        if(!result[0]){
          res.status(401).json({errors:"username or password is wrong"})
        }else{
          const isLoginValid = await  bcrypt.compare(password, result[0].password)
          if(!isLoginValid){
              res.status(401).json({errors:"username or password is wrong"})
          }
          const token = uuid().toString()

          const sql = "UPDATE users SET token = ? WHERE username = ?"
          db.query(sql, [token, result[0].username],(error, fields)=>{
              res.status(200).json({
                token: token
              })
          })
        }
  })
};

//get current user
const get = (username, res)=>{
    const sql = `SELECT * FROM users WHERE username = ?`
    db.query(sql, [username], (error, fields)=>{

        if(!fields[0]){
          res.status(404).json({
            errors: "user is not found"
          })
        }else{
          const user = {
            name: fields[0].name,
            username: fields[0].username
          }
          res.status(200).json({data: user})
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
const update = (req, res) => {
  const { username, name, password, profile, status_toko } = req;

  const countUser = `SELECT COUNT(*) as userCount FROM users WHERE username = ?`;

  db.query(countUser, [username], async (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ errors: "Internal server error" });
    }

    const userCount = result[0].userCount;

    if (userCount === 0) {
      return res.status(404).json({ errors: "User not found" });
    }

    const data = {};

    if (name !== undefined) {
      data.name = name;
    }
    if (password !== undefined) {
      data.password = await bcrypt.hash(password, 10);
    }
    if (profile !== undefined) {
      data.profile = profile;
    }
    if (status_toko !== undefined) {
      data.status_toko = status_toko;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ errors: "No data provided for update" });
    }

    const updateColumns = Object.keys(data).map((key) => `${key} = ?`).join(', ');

    const updateUser = `UPDATE users SET ${updateColumns} WHERE username = ?`;

    db.query(updateUser, [...Object.values(data), username], (updateError, updateResult) => {
      if (updateError) {
        console.error(updateError);
        return res.status(500).json({ errors: "Internal server error" });
      }
      if (updateResult.affectedRows === 1) {
      const user = {
        username: username,
        name:data.name,
        password:data.password,
        status_toko:data.status_toko
      }
      res.status(200).json({
        message: "User updated successfully",
        data: user
      });
    }
    });
  });
};


//list users
const users = (res)=>{
  let sql = `SELECT * FROM users`
  db.query(sql, (err, fields)=>{
    console.log(fields);
    res.status(200).json({data:fields})
  })
}

//get user by euqry param
// Pencarian user berdasarkan username
const searchUser = (username, res) => {
  const sql = `SELECT * FROM users WHERE username LIKE ?`;
  const searchTerm = `%${username}%`;

  db.query(sql, [searchTerm], (error, fields) => {
    if (error) {x``
      console.error(error);
      return res.status(500).json({ errors: "Internal server error" });
    }

    if (fields.length === 0) {
      return res.status(404).json({ errors: "No user found" });
    }

    // const users = fields.map((user) => ({
    //   name: user.name,
    //   username: user.username,
    //   password: 
    //   // tambahkan field lainnya sesuai kebutuhan
    // }));

    res.status(200).json({ data: fields });
  });
};

module.exports = {
  register,
  login,
  get,
  logout,
  update,
  users,
  searchUser
};
