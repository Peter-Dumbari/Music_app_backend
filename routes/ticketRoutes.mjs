import express from "express";
import { authMiddleware } from "../middleWares/authMiddleware.mjs";
import { buyTicket, getTickets } from "../controllers/ticketController.mjs";
const router = express.Router();

router.post("/buy/:id", authMiddleware, buyTicket);
router.get("/myTickets", authMiddleware, getTickets);

export default router;
