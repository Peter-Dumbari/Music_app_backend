import mongoose from "mongoose";

// Define the Comment schema
const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    content: {
      type: String,
      required: true, // Comment text is required
    },
    type: {
      type: String,
      enum: ["blog", "music"], // Specify the type of the comment
      required: true,
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type", // Dynamically references the associated model (Blog or Music)
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
