// server/api/auth/auth.js
const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // JWT secret'ı .env dosyanızdan alıyoruz

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Admin kullanıcı bilgilerini veritabanından çek
    const result = await pool.query("SELECT * FROM admin WHERE mail = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password 1" });
    }

    // Şifreyi kontrol et
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password 2" });
    }

    // JWT token oluştur
    const token = jwt.sign({ email: user.mail }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Token ve gerekli bilgileri gönder
    res.json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
