const pool = require("../../config/db");

// Kullanıcıyı e-posta ve şifre ile bulma
async function findUserByEmailAndPassword(email, password) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM admin WHERE mail = $1 AND password = $2",
      [email, password]
    );
    return result.rows[0]; // İlk satırı döndür
  } finally {
    client.release();
  }
}

module.exports = { findUserByEmailAndPassword };
