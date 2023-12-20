const db = require("../application/connection");
const bcrypt = require("bcrypt");
const { v4: uuid } = require('uuid');

// login admin
const login =  (req,res) => {
    const {username, password} = req;
    const findAdmin = `SELECT * FROM admin WHERE username = ? and password = ?`;
  
    db.query(findAdmin,[username, password], async(error, result)=>{
          // jika datanya tidak ada
          if(!result[0]){
            res.status(401).json({errors:"username or password is wrong"})
          }else{
            res.status(200).json({data:{
                username : username,
                password : password
            }})

            // const token = uuid().toString()

            // const sql = "UPDATE users SET token = ? WHERE username = ?"
            // db.query(sql, [token, result[0].username],(error, fields)=>{
            //     res.status(200).json({
            //       token: token
            //     })
            // })
          }
    })
};

// logout admin
const logout = (username, password, res)=>{
  let sql = `SELECT * FROM admin WHERE username = ? and password = ?`
  db.query(sql, [username, password], (error, result)=>{
    if (error) {
      res.status(500).json({
        errors: "Internal server error"
      });
    } else {
      if (result[0]) {
        res.status(200).json({
          data: "OK"
        });
      } else {
        res.status(404).json({
          errors: "admin is not found"
        });
      }
    }
  })
}

// get list users
const usersAdmin = (res)=>{
  let sql = `SELECT * FROM users`
  db.query(sql, (err, fields)=>{
    console.log(fields);
    res.status(200).json({data:fields})
  })
}

// update user
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
      data.profile = profile
    }
    if (status_toko !== undefined) {
      data.status_toko = status_toko;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ errors: "No data provided for update" });
    }

    const updateColumns = Object.keys(data).map((key) => `${key} = ?`).join(', ');

    const updateUser = `UPDATE users SET ${updateColumns} WHERE username = ?`;

    db.query(
      updateUser,
      [...Object.values(data), username],
      (updateError, updateResult) => {
        if (updateError) {
          console.error(updateError);
          return res.status(500).json({ errors: "Internal server error" });
        }
        if (updateResult.affectedRows === 1) {
          const user = {
            username: username,
            name: data.name,
            password: data.password,
            status_toko: data.status_toko,
            profile: profile,
          };
          res.status(200).json({
            message: "User updated successfully",
            data: user,
          });
        }
      }
    );
  });
};


module.exports = {
    login,
    logout,
    usersAdmin,
    update
};
  