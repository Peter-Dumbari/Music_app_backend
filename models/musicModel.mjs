import mongoose from "mongoose";

// Media Schema (for both music and event videos)
const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: false, // Can be optional for event videos
    },
    album: {
      type: String,
      required: false, // Only for music
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: false,
    },
    mediaType: {
      type: String,
      enum: ["audio", "music_video", "event_video"],
      required: true,
    },
    postDate: {
      type: Date,
      default: Date.now,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export default mongoose.model("Media", mediaSchema);
