import express from "express";
import {
  createAlbum,
  deleteAlbum,
  getAlbum,
  getAlbums,
  updateAlbum,
} from "../controllers/albumController.mjs";
import { authMiddleware, isAdmin } from "../middleWares/authMiddleware.mjs";
let router = express.Router();

router.post("/", authMiddleware, isAdmin, createAlbum);
router.get("/", authMiddleware, isAdmin, getAlbums);
router.get("/:id", authMiddleware, isAdmin, getAlbum);
router.put("/:id", authMiddleware, isAdmin, updateAlbum);
router.delete("/:id", authMiddleware, isAdmin, deleteAlbum);

export default router;
