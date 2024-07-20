const express = require("express");
const router = express.Router();
const pool = require("../../config/db"); // Veritabanı bağlantısı

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { recent_photo, recent_date, recent_title, recent_comment } = req.body;

  try {
    const result = await pool.query(
      `UPDATE recentnews 
       SET 
         recent_photo = $1, 
         recent_date = $2, 
         recent_title = $3, 
         recent_comment = $4         
       WHERE id = $5 RETURNING *`,
      [recent_photo, recent_date, recent_title, recent_comment, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Blog section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating Blog section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
