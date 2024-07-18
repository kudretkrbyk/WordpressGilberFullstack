const express = require("express");
const router = express.Router();
const pool = require("../../config/db"); // Veritabanı bağlantısı

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { partner_logo } = req.body;

  try {
    const result = await pool.query(
      `UPDATE partner 
       SET 
         partner_logo = $1 
        
       WHERE id = $2 RETURNING *`,
      [partner_logo, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Partner section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating partner section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
