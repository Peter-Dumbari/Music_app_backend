import express from "express";
import { authMiddleware, isAdmin } from "../middleWares/authMiddleware.mjs";
import upload from "../configs/multer.mjs";
import {
  getVideoById,
  getVideos,
  updateVideo,
  uploadVideo,
} from "../controllers/videoController.mjs";

let router = express.Router();

router.post("/", authMiddleware, isAdmin, upload.single("video"), uploadVideo);
router.get("/", getVideos);
router.get("/:id", getVideoById);
router.put("/:id", authMiddleware, isAdmin, updateVideo);

export default router;
