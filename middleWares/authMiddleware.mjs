import User from "../models/userModel.mjs";
import jwt from "jsonwebtoken";
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        req.user = await User.findById(decoded.id);
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Please login");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

export default authMiddleware;
