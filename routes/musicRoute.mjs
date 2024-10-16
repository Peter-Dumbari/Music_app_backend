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

router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.single("thumbnailUrl"),
  upload.single("music"),
  createMusic
);
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
