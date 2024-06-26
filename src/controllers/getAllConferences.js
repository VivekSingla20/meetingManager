const pool = require("../dbconfig");

const getAllConferences = (req, res) => {
  const sql = `SELECT * FROM Userconferences;`;
  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    } else {
      console.log("Database query successful, sending response...");
      return res.status(200).json(result);
    }
  });
};

module.exports = getAllConferences;
