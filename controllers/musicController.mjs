import Music from "../models/musicModel.mjs"; // Assuming the model is named mediaModel.js

// Create and upload music
export const createMusic = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Cloudinary file URL (uploaded file URL)
    const fileUrl = req.file.path;

    // Optional: Thumbnail URL for the music
    const thumbnailUrl = req.body.thumbnailUrl || null;

    // Create the new music document using the Media model
    const newMusic = new Music({
      title: req.body.title,
      artist: req.body.artist || null, // Artist can be optional for event videos
      album: req.body.album || null, // Optional album
      category: req.body.category,
      fileUrl: fileUrl, // Cloudinary file URL
      thumbnailUrl: thumbnailUrl, // Thumbnail, if provided
      mediaType: req.body.mediaType, // Should be either "audio", "music_video", or "event_video"
      releaseDate: req.body.releaseDate || Date.now(),
      description: req.body.description || "",
    });

    // Save the music to the database
    const savedMusic = await newMusic.save();

    return res.status(201).json({
      message: "Music uploaded and created successfully",
      music: savedMusic,
    });
  } catch (error) {
    console.error("Error creating music:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
