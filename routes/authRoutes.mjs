import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginController,
  updateUser,
} from "../controllers/userController.mjs";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginController);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
