const express = require("express");
const router = express.Router();
const pool = require("../../config/db"); // Veritabanı bağlantısı

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { contact_title, contact_address, contact_phone_number, contact_mail } =
    req.body;

  try {
    const result = await pool.query(
      `UPDATE contact 
       SET 
         contact_title = $1, 
         contact_address = $2, 
         contact_phone_number = $3, 
         contact_mail = $4         
       WHERE id = $5 RETURNING *`,
      [contact_title, contact_address, contact_phone_number, contact_mail, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Contact section not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating Contact section:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
