const express = require("express");
const router = new express.Router();
const cloudinary = require("cloudinary");
const multer = require("multer");

const upload = multer({ dest: "src/routers/store/analysis/uploads" });

const { readCSVFile } = require("../functions/analysis");

// require("dotenv").config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

router.post("/analyse", upload.single("file"), async (req, res) => {
  const filename = req.file.filename;
  const mimetype = req.file.mimetype;

  const params = req.body;
  if (params.hasHeader === "true") {
    params.hasHeader = true;
  }
  if (params.hasHeader === "false") {
    params.hasHeader = false;
  }

  if (filename) {
    if (mimetype === "text/csv") {
      const path = `${__dirname}/store/analysis/uploads/${filename}`;
      readCSVFile(path, res, params);
    }
  }
});

module.exports = router;
