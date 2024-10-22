import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.mjs";

// Cloudinary storage setup for different file types
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folderName = "musics"; // Default folder for music files

    // Choose folder based on the field name in the form data
    if (file.fieldname === "profilePicture") {
      folderName = "profile_pictures"; // Folder for profile pictures
    } else if (file.fieldname === "thumbnailUrl") {
      folderName = "thumbnails"; // Folder for music thumbnails
    } else if (file.fieldname === "poster") {
      folderName = "event_posters"; // Folder for event posters
    } else if (file.fieldname === "blog") {
      folderName = "blog_images";
    }

    return {
      folder: folderName,
      resource_type: file.mimetype.startsWith("image") ? "image" : "auto", // 'image' for pictures, 'auto' for music files
      allowed_formats: file.mimetype.startsWith("image")
        ? ["jpg", "jpeg", "png"] // Allowed formats for images
        : ["mp3", "wav"], // Allowed formats for music files
    };
  },
});

const upload = multer({ storage });

export default upload;
