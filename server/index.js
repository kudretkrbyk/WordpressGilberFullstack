const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

// GET ve POST işlemleri için gerekli modüller
const getHome = require("./api/get/getHome");
const getAbout = require("./api/get/getAbout");
const getContact = require("./api/get/getContact");
const getEducation = require("./api/get/getEducation");
const getPartner = require("./api/get/getPartner");
const getProject = require("./api/get/getProject");
const getRecentNews = require("./api/get/getRecentNews");
const getTestimonial = require("./api/get/getTestimonial");
const updateHome = require("./api/post/updateHome");
const updateAbout = require("./api/post/updateAbout");
const updateContact = require("./api/post/updateContact");
const updateProject = require("./api/post/updateProject");
const updateEducation = require("./api/post/updateEducation");
const updatePartner = require("./api/post/updatePartner");
const updateTestimonial = require("./api/post/updateTestimonial");
const updateBlog = require("./api/post/updateBlog");

// Middleware
const authenticateToken = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET işlemleri
app.get("/home", getHome);
app.get("/about", getAbout);
app.get("/contact", getContact);
app.get("/education", getEducation);
app.get("/partner", getPartner);
app.get("/project", getProject);
app.get("/recentnews", getRecentNews);
app.get("/testimonial", getTestimonial);

// Auth işlemleri için gerekli modül
const auth = require("./api/auth/auth");

// POST işlemleri
app.use("/api/post/updateHome", updateHome);
app.use("/api/post/updateAbout", updateAbout);
app.use("/api/post/updateContact", updateContact);
app.use("/api/post/updateProject", updateProject);
app.use("/api/post/updateEducation", updateEducation);
app.use("/api/post/updatePartner", updatePartner);
app.use("/api/post/updateTestimonial", updateTestimonial);
app.use("/api/post/updateBlog", updateBlog);

// Auth işlemi
app.use("/api/auth/auth", auth);

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
