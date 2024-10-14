import express from "express";
import { createMusic } from "../controllers/musicController.mjs";
import { authMiddleware, isAdmin } from "../middleWares/authMiddleware.mjs";
import upload from "../configs/multer.mjs";

let router = express.Router();

router.post("/", authMiddleware, isAdmin, upload.single("music"), createMusic);

export default router;
