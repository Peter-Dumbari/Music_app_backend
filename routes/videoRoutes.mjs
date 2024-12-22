import express from "express";
import { authMiddleware, isAdmin } from "../middleWares/authMiddleware.mjs";
import upload from "../configs/multer.mjs";
import { getVideos, uploadVideo } from "../controllers/videoController.mjs";

let router = express.Router();

router.post("/", authMiddleware, isAdmin, upload.single("video"), uploadVideo);
router.get("/", getVideos);

export default router;
