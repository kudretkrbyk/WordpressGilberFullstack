// server/api/get/getDeneme.js
const pool = require("../../config/db");

const getContact = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contact");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = getContact;
