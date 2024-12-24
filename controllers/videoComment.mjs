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
