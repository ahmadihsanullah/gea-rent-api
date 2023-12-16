const db = require('../application/connection');

const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization"); // Check header body if there is an authorization

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
