const express = require("express");
const router = express.Router();
const pool = require("../../config/db"); // Veritabanı bağlantısı

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { education_icon, education_year, education_comment, education_title } =
    req.body;

  try {
    const result = await pool.query(
      `UPDATE education 
       SET 
         education_icon = $1, 
         education_year = $2, 
         education_comment = $3,
         education_title =$4
       WHERE id = $5 RETURNING *`,
      [education_icon, education_year, education_comment, education_title, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Education section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating education section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
