import express from "express";
import dbConnect from "./configs/dbConnect.mjs";
import dotenv from "dotenv";
import authUser from "./routes/authRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import bodyParser from "body-parser";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleWares/errorHandler.mjs";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dbConnect();
app.use("/api/user/", authUser);

app.use("/api/category", categoryRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
