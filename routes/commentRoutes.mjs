import express from "express";
import { authMiddleware } from "../middleWares/authMiddleware.mjs";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.mjs";

const router = express.Router();

router.post("/:blogId", authMiddleware, addComment);
router.put("/:blogId/comments/:commentId", authMiddleware, updateComment);
router.delete("/:blogId/comments/:commentId", authMiddleware, deleteComment);

export default router;
