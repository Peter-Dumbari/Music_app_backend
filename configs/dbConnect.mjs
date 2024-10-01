import mongoose from "mongoose";

const dbConnect = async () => {
  const connect = await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("Error:", err));
};

export default dbConnect;
