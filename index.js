import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import detect from 'detect-port';
import { updateOnCloudinary } from './utils/cloudinary.js';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file?.path;

    if (!filePath) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const result = await updateOnCloudinary(filePath);

    if (!result) {
      return res.status(500).json({ success: false, message: 'Upload failed' });
    }

    res.status(200).json({ success: true, imageUrl: result.secure_url });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


const DEFAULT_PORT = process.env.PORT || 3000;

detect(DEFAULT_PORT).then((availablePort) => {
  app.listen(availablePort, () => {
    console.log(`Server running at http://localhost:${availablePort}`);
  });
});
