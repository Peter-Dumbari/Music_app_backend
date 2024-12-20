import Music from "../models/medialModel.mjs";
import Comment from "../models/commentModel.mjs";

export const addMusicComment = async (req, res) => {
  try {
    const { musicId } = req.params;
    const { commentText, userId } = req.body;

    //find the music to add comment
    const music = await Music.findById(musicId);
    if (!music) return res.status(404).json({ msg: "Music is not found" });

    const newComment = await Comment.create({
      type: "music",
      refId: musicId,
      user: userId,
      content: commentText,
    });

    music.comments.push(newComment._id);

    await music.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error commenting on the music",
      error,
    });
  }
};

export const deleteMusicComment = async (req, res) => {
  const { musicId, commentId } = req.params;
  const { userId } = req.body;

  try {
    const music = await Music.findById(musicId);
    if (!music) return res.status(404).json({ message: "music not found" });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "comment not found" });

    if (comment.user.toString() !== userId)
      return res.status(401).json({
        message: "Can't delete someones comment",
      });

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong deleting comment",
      error,
    });
  }
};
