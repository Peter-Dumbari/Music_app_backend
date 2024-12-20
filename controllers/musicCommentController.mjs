import Music from "../models/musicModel.mjs";
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
