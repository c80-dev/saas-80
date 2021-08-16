const express = require("express");
const router = new express.Router();
// const cloudinary = require("cloudinary");
const multer = require("multer");

const upload = multer({ dest: "src/routers/store/analysis/uploads" });

const { readCSVFile, readXLSXFile } = require("../functions/analysis");

// require("dotenv").config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

router.post("/analyse", upload.single("file"), async (req, res) => {
  const filename = req.file.filename;
  const mimetype = req.file.mimetype;

  console.log(req.file);

  const params = req.body;
  if (params.hasHeader === "true") {
    params.hasHeader = true;
  }
  if (params.hasHeader === "false") {
    params.hasHeader = false;
  }
  if (!params.hasHeader) {
    params.hasHeader = false;
  }

  if (filename) {
    const path = `${__dirname}/store/analysis/uploads/${filename}`;

    if (mimetype === "text/csv") {
      readCSVFile(path, res, params);
      return;
    }
    if (
      mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      readXLSXFile(path, res, params);
      return;
    }

    res.status(400).send({ error: "Invalid file type" });
  }
});

module.exports = router;
