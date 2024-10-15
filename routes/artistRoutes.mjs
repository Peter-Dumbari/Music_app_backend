import express from "express";
import {
  createArtist,
  deleteArtist,
  getArtist,
  getArtists,
} from "../controllers/artistController.mjs";
let router = express.Router();

router.get("/", getArtists);
router.get("/:id", getArtist);
router.post("/", createArtist);
router.delete("/:id", deleteArtist);

export default router;
