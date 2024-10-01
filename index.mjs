import express from "express";
import dbConnect from "./configs/dbConnect.mjs";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
