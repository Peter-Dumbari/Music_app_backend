import express from "express";
import { authMiddleware } from "../middleWares/authMiddleware.mjs";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.mjs";
import {
  addMusicComment,
  deleteMusicComment,
  updateMusicComment,
} from "../controllers/musicCommentController.mjs";
import { addVidComment } from "../controllers/videoComment.mjs";

const router = express.Router();

//blog
router.post("/blog/:blogId", authMiddleware, addComment);
router.put("/blog/:blogId/comments/:commentId", authMiddleware, updateComment);
router.delete(
  "/blog/:blogId/comments/:commentId",
  authMiddleware,
  deleteComment
);

//music
router.post("/music/:musicId", authMiddleware, addMusicComment);
router.delete(
  "/music/:musicId/comments/:commentId",
  authMiddleware,
  deleteMusicComment
);
router.put(
  "/music/:musicId/comments/:commentId",
  authMiddleware,
  updateMusicComment
);

//video
router.post("/video/:id", authMiddleware, addVidComment);
export default router;
