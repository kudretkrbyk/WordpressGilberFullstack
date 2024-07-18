const express = require("express");
const router = express.Router();
const pool = require("../../config/db"); // Veritabanı bağlantısı

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    testimonial_ref_title,
    testimonial_ref_name,
    testimonial_ref_status,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE testimonial 
       SET 
         testimonial_ref_title = $1, 
         testimonial_ref_name = $2, 
         testimonial_ref_status = $3         
       WHERE id = $4 RETURNING *`,
      [testimonial_ref_title, testimonial_ref_name, testimonial_ref_status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "testimonial section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating testimonial section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
