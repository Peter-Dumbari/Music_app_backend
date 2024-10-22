import Blog from "../models/blogModel.mjs";
import Comment from "../models/commentModel.mjs";

export const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { commentText, userId } = req.body;

    // Find the blog to which the comment will be added
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Create the new comment
    const newComment = await Comment.create({
      blog: blogId,
      user: userId,
      content: commentText, // Make sure 'commentText' is being stored in 'content' field
    });

    // Add the new comment to the blog's comments array
    blog.comments.push(newComment._id);
    await blog.save();

    // Return success response with the newly created comment
    return res
      .status(200)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    // Return error response if something goes wrong
    return res
      .status(500)
      .json({ message: "Error commenting on this post", error });
  }
};

export const updateComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { userId, content } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId)
      return res.status(402).json({ message: "you can't someone's comment" });

    const editComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Comment updated successfully",
      comment: editComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error updating comment", error });
  }
};

export const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { userId } = req.body;

  try {
    // Find the blog by ID
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found!" });

    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check if the comment belongs to the user
    if (comment.user.toString() !== userId)
      return res
        .status(402)
        .json({ message: "Not authorize to delete comment" });

    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting comment", error });
  }
};
