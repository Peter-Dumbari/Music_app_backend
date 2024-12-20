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
} from "../controllers/musicCommentController.mjs";

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
export default router;
