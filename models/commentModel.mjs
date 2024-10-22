import mongoose from "mongoose";

// Define the Comment schema
const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      require: true,
    },
    content: {
      type: String,
      required: true, // Comment text is required
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
