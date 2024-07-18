const express = require("express");
const router = express.Router();
const pool = require("../../config/db"); // Veritabanı bağlantısı

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { project_title, project_comment, project_photo } = req.body;

  try {
    const result = await pool.query(
      `UPDATE project 
       SET 
         project_title = $1, 
         project_comment = $2, 
         project_photo = $3  
       WHERE id = $4 RETURNING *`,
      [project_title, project_comment, project_photo, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Project section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating Project section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
