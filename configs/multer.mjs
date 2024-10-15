import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.mjs";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "music",
    resource_type: "auto",
    allowed_formats: ["mp3", "wav"],
  },
});

const upload = multer({ storage });

export default upload;
