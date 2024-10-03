import express from "express";
import { createUser } from "../controllers/userController.mjs";

const router = express.Router();

router.post("/register", createUser);

export default router;
