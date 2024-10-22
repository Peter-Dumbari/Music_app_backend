import express from "express";
import { authMiddleware } from "../middleWares/authMiddleware.mjs";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  likeBlog,
  postBlog,
  updateBlog,
} from "../controllers/blogController.mjs";
import upload from "../configs/multer.mjs";

const router = express.Router();

router.post("/", upload.single("blog"), authMiddleware, postBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.put("/:id", authMiddleware, updateBlog);
router.post("/:blogId", likeBlog);
router.delete("/:id", authMiddleware, deleteBlog);

export default router;
