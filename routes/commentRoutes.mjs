import express from "express";
import { authMiddleware } from "../middleWares/authMiddleware.mjs";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.mjs";
import { addMusicComment } from "../controllers/musicCommentController.mjs";

const router = express.Router();

//blog
router.post("/:blogId", authMiddleware, addComment);
router.put("/:blogId/comments/:commentId", authMiddleware, updateComment);
router.delete("/:blogId/comments/:commentId", authMiddleware, deleteComment);

//music
router.post("/:musicId", authMiddleware, addMusicComment);
export default router;
