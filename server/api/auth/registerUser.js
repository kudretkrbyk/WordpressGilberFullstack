const bcrypt = require("bcrypt");
const pool = require("../../config/db");

// Kullanıcı kaydı örneği
const registerUser = async (email, password) => {
  try {
    // Şifreyi hash'le
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Kullanıcıyı veritabanına ekle
    await pool.query("INSERT INTO admin (mail, password) VALUES ($1, $2)", [
      email,
      hashedPassword,
    ]);

    console.log("Kullanıcı başarıyla kaydedildi.");
  } catch (error) {
    console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
  }
};

// Örnek kullanım
registerUser("example@example.com", "12345");
