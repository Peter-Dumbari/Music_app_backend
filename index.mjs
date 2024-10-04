import express from "express";
import dbConnect from "./configs/dbConnect.mjs";
import dotenv from "dotenv";
import authUser from "./routes/authRoutes.mjs";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dbConnect();

app.use("/api/user/", authUser);
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
