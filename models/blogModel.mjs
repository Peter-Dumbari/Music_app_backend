import mongoose from "mongoose";
import Comment from "../models/commentModel.mjs";

// Declare the Schema of the Mongo model
const blogSchema = new mongoose.Schema(
  {
    blogImg: {
      type: String,
    },
    title: {
      type: String,
      required: true, // Blog title is required
      trim: true, // Trims whitespace from the title
      maxlength: 100, // Optional: Limit the length of the title
    },
    content: {
      type: String,
      required: true, // Blog content is required
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (assuming you have users)
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Array of user IDs who liked the post
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },

  { timeStamp: true }
);

blogSchema.pre("remove", async function (next) {
  try {
    await Comment.deleteMany({ blog: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

//Export the model
export default mongoose.model("Blog", blogSchema);
