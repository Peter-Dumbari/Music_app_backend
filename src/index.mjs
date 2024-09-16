import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(routes);

const PORT = process.env.PORT || 3000;
const loggerMiddleWare = (req, res, next) => {
  console.log(`${req.method}-${req.path}`);
  next();
};

// app.use(loggerMiddleWare); // this will log all the request

app.get("/", (req, res) => {
  res.cookie("hello", "world", {
    maxAge: 6000 * 60,
  });
  res.status(201).send({ msg: "Hello World" });
});

app.use(loggerMiddleWare); // this will log all the request from this point down

//creating a patch request function

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
