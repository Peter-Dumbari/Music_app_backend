import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUser } from "./utils/constants.mjs";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Peter the dev",
    saveUninitialized: false,
    resave: false,

    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(routes);

const PORT = process.env.PORT || 3000;
const loggerMiddleWare = (req, res, next) => {
  console.log(`${req.method}-${req.path}`);
  next();
};

// app.use(loggerMiddleWare); // this will log all the request

app.get("/", (req, res) => {
  req.session.visited = true;
  res.cookie("hello", "world", {
    maxAge: 10000,
  });
  res.status(201).send({ msg: "Hello World" });
});

app.post("/api/v1/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;

  const findUser = mockUser.find((user) => user.name === username);

  if (!findUser || findUser.password !== password)
    return res.status(401).send({ msg: "Invalid Credentials" });

  req.session.user = findUser;

  return res.status(200).send(findUser);
});

app.get("/api/v1/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log("session", session);
  });
  return req.session.user
    ? res.status(201).send(req.session.user)
    : res.status(401).send({ msg: "User not authenticated" });
});

app.post("/api/v1/cart", (req, res) => {
  if (!req.session.user)
    return res.status(404).send({ msg: "user not authenticated" });

  let { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }

  return res.status(201).send(item);
});

app.get("/api/v1/cart", (req, res) => {
  if (!req.session.user)
    return res.status(404).send({ msg: "user not authenticated" });

  return res.status(201).send(req.session.cart ?? []);
});

app.use(loggerMiddleWare); // this will log all the request from this point down

//creating a patch request function

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
