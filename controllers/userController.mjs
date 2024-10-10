import { generateToken } from "../configs/jwtToken.mjs";
import User from "../models/userModel.mjs";
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  let findUser = await User.findOne({ email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    return res.json(newUser);
  } else
    res.json({
      msg: "User already exists",
      success: false,
    });
});

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    return res.json({
      msg: "Login successful",
      success: true,
      id: findUser._id,
      name: findUser.firstname,
      email: findUser.email,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Invalid credentials");
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ msg: "User updated successfully", user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json({ msg: "User deleted successfully", user });
});
