import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const updateOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder:"images"
    });

    fs.unlinkSync(localFilePath);
    console.log("Uploaded to Cloudinary:", response.url);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); 
    console.error("Upload error:", error);
    return null;
  }
};

export { updateOnCloudinary };
