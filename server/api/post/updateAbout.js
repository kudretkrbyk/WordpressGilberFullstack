const express = require("express");
const router = express.Router();
const pool = require("../../config/db"); // Veritabanı bağlantısı

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    about_cover_title,
    about_skill_1,
    about_skill_degree_1,
    about_skill_2,
    about_skill_degree_2,
    about_skill_3,
    about_skill_degree_3,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE about 
       SET 
         about_cover_title = $1, 
         about_skill_1 = $2, 
         about_skill_degree_1 = $3, 
         about_skill_2 = $4, 
         about_skill_degree_2 = $5, 
         about_skill_3 = $6, 
         about_skill_degree_3 = $7 
       WHERE id = $8 RETURNING *`,
      [
        about_cover_title,
        about_skill_1,
        about_skill_degree_1,
        about_skill_2,
        about_skill_degree_2,
        about_skill_3,
        about_skill_degree_3,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "About section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating about section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
