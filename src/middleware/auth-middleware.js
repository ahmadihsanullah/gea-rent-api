const db = require('../application/connection');

const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization"); // Check header body if there is an authorization

  if(req.path === '/api/admin/users'){
    return next();
  }
  
  if(req.path === '/api/admin/tokos'){
    return next();
  }
 
  if(req.path === '/api/admin/alamat'){
    return next();
  }
  
  if(req.path === '/api/admin/barang'){
    return next();
  }
  
  if(req.path === '/api/admin/gambar'){
    return next();
  }
  
  if(req.path === '/api/admin/logout'){
    return next();
  }

  if (!token) {
    return res.status(401).json({ errors: "unauthorized" });
  }

  const sql = `SELECT * FROM users WHERE token = ?`;

  db.query(sql, [token], (error, fields) => {
    if (error) {
      // Handle the database query error, e.g., log it
      console.error("Database query error:", error);
      return res.status(500).json({ errors: "internal server error" });
    }

    if (!fields[0]) {
      return res.status(401).json({ errors: "unauthorized" });
    }

    req.user = fields[0];
    next();
  });
};

module.exports = authMiddleware;
