import express from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello World" });
});

const mockUser = [
  { id: 0, name: "john", displayName: "Johny" },
  { id: 1, name: "doe", displayName: "Doe" },
  { id: 2, name: "jane", displayName: "Jane" },
];

app.get("/api/v1/users", (req, res) => {
  console.log("req.query", req.query);
  const {
    query: { filter, value },
  } = req;

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
});

//sending data function

app.post("/api/v1/users", (req, res) => {
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
});

//creating a put request function
app.put("/api/v1/users/:id", (req, res) => {
  let {
    body,
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
  mockUser[findUserIndex] = { id: parseId, ...body };
  return res.sendStatus(200);
});

app.patch("/api/v1/users/:id", (req, res) => {
  let {
    body,
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
});

app.get("/api/v1/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Bad Request. invalid ID" });
  }

  const user = mockUser.find((user) => user.id === parsedId);
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  } else {
    return res.status(200).send(user);
  }
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
