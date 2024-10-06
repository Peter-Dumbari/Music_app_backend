import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: false,
    },
    profilePictureUrl: {
      type: String,
      required: false,
    },
    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Artist", artistSchema);
