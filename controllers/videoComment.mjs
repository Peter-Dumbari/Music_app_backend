import Video from "../models/medialModel.mjs";
import Comment from "../models/commentModel.mjs";

export const addVidComment = async (req, res) => {
  const { id } = req.params;
  const { userId, commentText } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video)
      return res.status(404).json({
        message: `Video with id ${id} not found`,
      });

    const newComment = await Comment.create({
      type: "video",
      refId: id,
      user: userId,
      content: commentText,
    });

    video.comments.push(newComment._id);

    await video.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const updateVidComment = async (req, res) => {
  const { commentId, vidId } = req.params;
  const { userId, content } = req.body;

  try {
    const video = await Video.findById(vidId);
    if (!video)
      return res
        .status(404)
        .json({ message: `video with the id ${vidId} not found` });

    const comment = await Comment.findById(commentId);

    if (comment.user.toString() !== userId)
      return res.status(400).json({
        message: "Can't modify some'ones comment ",
      });

    const editComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    return res.status(200).json({
      message: "Comment Updated sucessfully",
      comment: editComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

export const deleteVidComment = async (req, res) => {
  const { vidId, commentId } = req.params;
  const { userId } = req.body;

  try {
    const video = await Video.findById(vidId);

    if (!video)
      return res
        .status(404)
        .json({ message: `Video with the id ${vidId} is not found` });

    const comment = await Comment.findById(commentId);

    if (!comment)
      return res
        .status(404)
        .json({ message: `Comment with the id ${commentId} is not found` });

    if (comment.user.toString() !== userId)
      return res
        .status(400)
        .json({ message: "You can't delete someones comment" });

    const deleteComment = await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      message: "Comment deleted successfully",
      comment: deleteComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
