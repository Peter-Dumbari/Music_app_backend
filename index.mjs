import express from "express";
import dbConnect from "./configs/dbConnect.mjs";
import dotenv from "dotenv";
import authUser from "./routes/authRoutes.mjs";
import categoryRoutes from "./routes/categoryRoutes.mjs";
import bodyParser from "body-parser";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleWares/errorHandler.mjs";
import cookieParser from "cookie-parser";
import musicRoutes from "./routes/musicRoute.mjs";
import artistRoutes from "./routes/artistRoutes.mjs";
import albumRoutes from "./routes/albumRoutes.mjs";
import eventRoutes from "./routes/eventRoutes.mjs";
import ticketRoutes from "./routes/ticketRoutes.mjs";

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
app.use("/api/music", musicRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/ticket", ticketRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
