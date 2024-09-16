import { Router } from "express";
import { query, validationResult } from "express-validator";
import { mockUser } from "../utils/constants.mjs";

const router = Router();

router.get("/api/v1/users", (req, res) => {
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

export default router;
