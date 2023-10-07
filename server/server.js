const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 9090;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT,
  })
);

let fileName;
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    // filename for the stored file
    try {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
      const fileExtension = path.extname(file.originalname);
      fileName = `${timestamp}_${randomString}${fileExtension}`;
      cb(null, fileName);
    } catch (e) {
      cb(new Error(e));
    }
  },

  destination: (req, file, cb) => {
    // destination folder
    cb(null, "../data/src");
  },
});

const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no file uploaded." });
  }
  return res.status(200).json({
    message: "file uploaded successfully.",
    url: process.env.CLIENT + "/" + fileName,
  });
});

app.listen(port);
