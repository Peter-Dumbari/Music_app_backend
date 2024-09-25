import { Router } from "express";
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { mockUser } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchema.mjs";
import { resolveFindUserIndex } from "../utils/middlewares.mjs";
import { User } from "../mongoose/schema/user.mjs";
import { harshPassword } from "../utils/helpers.mjs";

const router = Router();

//index
router.get("/api/v1/users", (req, res) => {
  console.log("session", req.session);
  console.log("session id from user", req.sessionID);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }

    console.log("sessionData", sessionData);
  });
  const {
    query: { filter, value },
  } = req;
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
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

//show

router.get("/api/v1/users/:id", resolveFindUserIndex, (req, res) => {
  let { findUserIndex } = req;

  const user = mockUser[findUserIndex];
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  } else {
    return res.status(200).send(user);
  }
});

router.put("/api/v1/users/:id", resolveFindUserIndex, (req, res) => {
  let { body, findUserIndex } = req;
  mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body };
  console.log("findUserIndex", findUserIndex);
  return res.sendStatus(200);
});

router.patch("/api/v1/users/:id", resolveFindUserIndex, (req, res) => {
  let { body, findUserIndex } = req;

  mockUser[findUserIndex] = { ...mockUser[findUserIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/api/v1/users/:id", resolveFindUserIndex, (req, res) => {
  const { findUserIndex } = req;
  mockUser.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

//create
// router.post(
//   "/api/v1/users",
//   checkSchema(createUserValidationSchema),
//   (res, req, next) => {
//     next();
//   },
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send(errors.array());
//     }
//     const data = matchedData(req);
//     console.log("data", data);

//     const newUser = {
//       id: mockUser[mockUser.length - 1].id + 1,
//       ...data,
//     };
//     mockUser.push(newUser);
//     res.status(201).send(newUser);
//   }
// );

router.post(
  "/api/v1/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    const data = matchedData(req);
    data.password = harshPassword(data.password);
    console.log("data", data);
    // const { body } = req;
    const newUser = new User(data);

    try {
      const saveUser = await newUser.save();
      return res.status(201).send(saveUser);
    } catch (err) {
      console.log("user creation error:", err);
      return res.sendStatus(400);
    }
  }
);

export default router;
