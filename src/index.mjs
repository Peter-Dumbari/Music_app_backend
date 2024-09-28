import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./strategies/discord-strategy.mjs";
import MongoStore from "connect-mongo";
// import "./strategies/local-strategy.mjs";

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/express-tutorial")

  .then(() => console.log("connected to Database"))
  .catch((err) => console.log("Error:", err));
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

    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

// app.post("/api/v1/auth", (req, res) => {
//   const {
//     body: { username, password },
//   } = req;

//   const findUser = mockUser.find((user) => user.name === username);

//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ msg: "Invalid Credentials" });

//   req.session.user = findUser;

//   return res.status(200).send(findUser);
// });

// app.get("/api/v1/auth/status", (req, res) => {
//   req.sessionStore.get(req.sessionID, (err, session) => {
//     console.log("session", session);
//   });
//   return req.session.user
// ? res.status(201).send(req.session.user)
//     : res.status(401).send({ msg: "User not authenticated" });
// });

// app.post("/api/v1/auth", passport.authenticate("local"), (req, res) => {
//   return res.send({ msg: "Hello world" });
// });

app.get("/api/v1/auth/status", (req, res) => {
  console.log("inside api/v1/status");
  console.log("req.user", req.user);
  console.log("req.session", req.session);
  if (req.user) {
    return res.status(201).send(req.user);
  } else {
    return res.status(401).send({ msg: "User not authenticated" });
  }
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

app.post("/api/v1/auth/logout", (req, res) => {
  if (!req.user) {
    return res.status(404).send({ msg: "User not found" });
  }

  req.logOut((err) => {
    if (err) return res.sendStatus(401);
    res.send({ msg: "You have succesfully logout" }).status(201);
  });
});

app.get("/api/v1/cart", (req, res) => {
  if (!req.session.user)
    return res.status(404).send({ msg: "user not authenticated" });

  return res.status(201).send(req.session.cart ?? []);
});

app.use(loggerMiddleWare); // this will log all the request from this point down

//creating a patch request function

app.get("/api/v1/auth/discord", passport.authenticate("discord"));

app.get(
  "/api/v1/auth/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.sendStatus(200);
  }
);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

//client secret: 4LWGTtkwEKwtL7p4XWn6geKrG1edTnlA
// client id: 1288468034020835380;
// http://localhost:3000/api/v1/auth/discord/redirect
