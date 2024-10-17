import { log } from "console";
import Music from "../models/musicModel.mjs"; // Assuming the model is named mediaModel.js

// Create and upload music
export const createMusic = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || !req.files.music) {
      return res.status(400).json({ message: "No music file uploaded" });
    }

    // Cloudinary URLs for music and thumbnail
    const musicFileUrl = req.files.music[0].path; // Get music file URL

    const thumbnailFileUrl = req.files.thumbnailUrl
      ? req.files.thumbnailUrl[0].path // If thumbnail was uploaded
      : null;

    // Create the new music document using the Music model
    const newMusic = new Music({
      title: req.body.title,
      artist: req.body.artist || null, // Artist can be optional for event videos
      album: req.body.album || null, // Optional album
      category: req.body.category,
      fileUrl: musicFileUrl, // Cloudinary music file URL
      thumbnailUrl: thumbnailFileUrl, // Cloudinary thumbnail URL (if provided)
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
  const objectQuery = { ...req.query };
  console.log("objectQuery", objectQuery);

  const excludeFields = ["name", "page", "limit", "sort"];
  excludeFields.forEach((el) => delete objectQuery[el]);

  console.log("query2", excludeFields);
  try {
    // Fetch all music from the database
    const music = await Music.where("mediaType").equals("audio");

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

//download music
export const downloadMusic = async (req, res) => {
  const { id } = req.params;
  try {
    const music = await Music.findById(id);
    await Music.findByIdAndUpdate(
      id,
      {
        $inc: { downloads: 1 },
      },
      { new: true }
    );

    if (!music) {
      return res.status(404).json({ msg: "Music not found" });
    }

    res.redirect(music.fileUrl);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
