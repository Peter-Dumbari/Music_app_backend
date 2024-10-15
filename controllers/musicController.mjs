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

// Get all music
export const getMusic = async (req, res) => {
  try {
    // Fetch all music from the database
    const music = await Music.find();

    return res.status(200).json({ music });
  } catch (error) {
    console.error("Error fetching music:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//update music

export const updateMusic = async (req, res) => {
  try {
    const music = await Music.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!music) {
      return res.status(404).json({ msg: "Music not found" });
    }
    return res.status(200).json(music);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//delete music

export const deleteMusic = async (req, res) => {
  try {
    const music = await Music.findByIdAndDelete(req.params.id);
    if (!music) {
      return res.status(404).json({ msg: "Music not found" });
    }
    return res.status(200).json({ msg: "Music deleted successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
