import { Router } from "express";
import { query, validationResult } from "express-validator";
import { mockUser } from "../utils/constants.mjs";

const router = Router();

router.get(
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
  }
);

export default router;
