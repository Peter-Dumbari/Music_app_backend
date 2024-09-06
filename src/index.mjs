import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello World" });
});

const mockUser = [
  { id: 0, name: "john" },
  { id: 1, name: "doe" },
  { id: 2, name: "jane" },
];

app.get("/api/v1/users", (req, res) => {
  res.status(201).send(mockUser);
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
