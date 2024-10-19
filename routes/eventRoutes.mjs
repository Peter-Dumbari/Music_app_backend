import express from "express";
import { createEvent } from "../controllers/eventController.mjs";
import { authMiddleware, isAdmin } from "../middleWares/authMiddleware.mjs";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createEvent);

export default router;
