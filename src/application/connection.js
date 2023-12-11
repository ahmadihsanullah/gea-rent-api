const mysql = require('mysql2')

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gea_rent",
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from('your_password') // Use your actual password here
      }
})

module.exports = db