const express = require("express");
const router = express.Router();
const pool = require("../../config/db"); // Veritabanı bağlantısı

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { home_tittle, home_name, home_cover_title, home_photo_link } =
    req.body;

  try {
    const result = await pool.query(
      "UPDATE home SET home_tittle = $1, home_name = $2, home_cover_title = $3, home_photo_link = $4 WHERE id = $5 RETURNING *",
      [home_tittle, home_name, home_cover_title, home_photo_link, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Home not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating home:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
