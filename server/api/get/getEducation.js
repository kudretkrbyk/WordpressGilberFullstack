const pool = require("../../config/db");

const getEducation = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM education");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = getEducation;
