import express from "express";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import mongoose from "mongoose";
import Guest from "./models/guest.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failure error: ", err));

const upload = multer({ dest: "uploads/" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "images",
    });
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error("Cloudinary error:", error.message);
    return null;
  }
};

function generateGuestId(name) {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${name}_${randomSuffix}`;
}

app.post("/upload", upload.array("files", 10), async (req, res) => {
  const { name, guestId } = req.body;
  const files = req.files;

  if (!name || files.length === 0) {
    return res
      .status(400)
      .json({ message: "Guest name and files are required." });
  }

  try {
    let guest;

    // Try to fetch guest using guestId from localStorage
    if (guestId) {
      guest = await Guest.findOne({ guestId });
    }

    // Fallback: Try finding any existing guest with the same name (who's under 50 uploads)
    if (!guest) {
      const candidates = await Guest.find({ name });
      for (const g of candidates) {
        if (g.uploads < 50) {
          guest = g;
          break;
        }
      }
    }

    // If no guest found, create a new one (only if total uploads < 50)
    if (!guest) {
      const newGuestId = generateGuestId(name);
      guest = new Guest({
        name,
        guestId: newGuestId,
        uploads: 0,
        images: [],
      });
    }
  
    const remaining = 50 - guest.uploads;
    if (files.length > remaining) {
      return res.status(403).json({
        message: `You can only upload ${remaining} more image(s).`,
        guestId: guest.guestId,
      });
    }

    const urls = [];

    for (const file of files) {
      const uploadedUrl = await uploadToCloudinary(file.path);
      if (uploadedUrl) {
        urls.push(uploadedUrl);
        guest.images.push(uploadedUrl);
      }
    }

    guest.uploads += urls.length;
    await guest.save();

    res.status(200).json({
      message: `Uploaded ${urls.length} image(s).`,
      urls,
      guestId: guest.guestId,
      remaining: 50 - guest.uploads,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
