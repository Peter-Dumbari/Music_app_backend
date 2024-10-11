import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  handleRefereshToken,
  loginController,
  logout,
  updateUser,
} from "../controllers/userController.mjs";
import { authMiddleware, isAdmin } from "../middleWares/authMiddleware.mjs";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginController);
router.get("/", getUsers);
router.delete("/logout", logout);
router.get("/refresh", handleRefereshToken);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
