import express from "express";
import {
  createMusic,
  deleteMusic,
  downloadMusic,
  getMusic,
  updateMusic,
} from "../controllers/musicController.mjs";
import { authMiddleware, isAdmin } from "../middleWares/authMiddleware.mjs";
import upload from "../configs/multer.mjs";

let router = express.Router();
// Configure multer to handle both music and thumbnail uploads
const musicUpload = upload.fields([
  { name: "music", maxCount: 1 }, // Music file upload
  { name: "thumbnailUrl", maxCount: 1 }, // Thumbnail file upload
]);

router.post("/", authMiddleware, isAdmin, musicUpload, createMusic);
router.get("/", getMusic);
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  upload.single("music"),
  updateMusic
);
router.get("/:id", downloadMusic);
router.delete("/:id", authMiddleware, isAdmin, deleteMusic);

export default router;
