import express from "express";
import { authMiddleware } from "../middleWares/authMiddleware.mjs";
import { buyTicket } from "../controllers/ticketController.mjs";
const router = express.Router();

router.post("/buy/:id", authMiddleware, buyTicket);

export default router;
