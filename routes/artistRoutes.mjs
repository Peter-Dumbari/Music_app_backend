import express from "express";
import {
  createArtist,
  deleteArtist,
  getArtist,
  getArtists,
  updateArtist,
} from "../controllers/artistController.mjs";
let router = express.Router();
import upload from "../configs/multer.mjs";

router.get("/", getArtists);
router.get("/:id", getArtist);
router.post("/", createArtist);
router.put("/:id", upload.single("profilePicture"), updateArtist);
router.delete("/:id", deleteArtist);

export default router;
