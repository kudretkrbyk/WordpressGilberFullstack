// server/index.js
const express = require("express");
const pool = require("./config/db");

const getHome = require("./api/get/getHome");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", getHome);
app.post("/deneme", postDeneme);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Database connected:", res.rows);
  }
});
