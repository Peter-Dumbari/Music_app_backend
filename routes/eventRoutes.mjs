import express from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.mjs";
import { authMiddleware, isAdmin } from "../middleWares/authMiddleware.mjs";
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.put("/:id", authMiddleware, isAdmin, updateEvent);
router.delete("/:id", authMiddleware, isAdmin, deleteEvent);

export default router;
