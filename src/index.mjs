import express from "express";
import { query, validationResult } from "express-validator";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const loggerMiddleWare = (req, res, next) => {
  console.log(`${req.method}-${req.path}`);
  next();
};

const resolveFindUserIndex = (req, res, next) => {
  let {
    params: { id },
  } = req;

  const parseId = parseInt(id);
  if (isNaN(parseId)) {
    return res.status(400).send({ msg: "Bad Request. invalid ID" });
  }
  const findUserIndex = mockUser.findIndex((user) => user.id === parseId);

  if (findUserIndex === -1) {
    return res.status(404).send({ msg: "User not found" });
  }
  req.findUserIndex = findUserIndex;
  next();
};
// app.use(loggerMiddleWare); // this will log all the request

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello World" });
});

const mockUser = [
  { id: 0, name: "john", displayName: "Johny" },
  { id: 1, name: "doe", displayName: "Doe" },
  { id: 2, name: "jane", displayName: "Jane" },
];

app.get(
  "/api/v1/users",
  query("filter")
    .isString()
    .withMessage("filter must be a string")
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("filter must be a string and must be between 3-10 characters"),
  (req, res) => {
    const {
      query: { filter, value },
    } = req;
    const result = validationResult(req);
    console.log("result", result);
    if (!value && !filter) {
      return res.status(200).send(mockUser);
    }

    if (value && filter) {
      const filteredUsers = mockUser.filter((user) =>
        user[filter].includes(value)
      );
      return res.status(200).send(filteredUsers);
    }
    res.status(201).send(mockUser);
  }
);

//sending data function

app.post(
  "/api/v1/users",
  (res, req, next) => {
    console.log("req.body", req.body); // this middle ware will log the body of the request
    next();
  },
  (req, res) => {
    console.log("req.body", req.body);
    const { body } = req;
    if (!body) {
      return res.status(400).send({ msg: "Bad Request" });
    }
    const newUser = {
      id: mockUser[mockUser.length - 1].id + 1,
      ...body,
    };
    mockUser.push(newUser);
    res.status(201).send(newUser);
  }
);

//creating a put request function
app.put("/api/v1/users/:id", resolveFindUserIndex, (req, res) => {
  let { body, findUserIndex } = req;
  mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body };
  console.log("findUserIndex", findUserIndex);
  return res.sendStatus(200);
});

app.use(loggerMiddleWare); // this will log all the request from this point down

//creating a patch request function

app.patch("/api/v1/users/:id", resolveFindUserIndex, (req, res) => {
  let { body, findUserIndex } = req;

  mockUser[findUserIndex] = { ...mockUser[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.get("/api/v1/users/:id", resolveFindUserIndex, (req, res) => {
  let { findUserIndex } = req;
  const user = mockUser[findUserIndex];
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  } else {
    return res.status(200).send(user);
  }
});

app.delete("/api/v1/users/:id", resolveFindUserIndex, (req, res) => {
  const { findUserIndex } = req;
  mockUser.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

app.get("/api/v1/products", (req, res) => {
  res.status(201).send([
    { id: 0, name: "product 1" },
    { id: 1, name: "product 2" },
    { id: 2, name: "product 3" },
  ]);
});
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
