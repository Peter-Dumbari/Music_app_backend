import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Artist name is required"],
      unique: true,
      trim: true, // Removes extra spaces
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
      youtube: String,
    },
    contact: {
      email: { type: String, required: false },
      phone: { type: String, required: false },
    },

    base: {
      type: String,
    },

    verified: {
      type: Boolean,
      default: false, // Indicates if the artist is verified
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Artist", artistSchema);
