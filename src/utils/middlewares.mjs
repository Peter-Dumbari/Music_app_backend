import { mockUser } from "./constants.mjs";

export const resolveFindUserIndex = (req, res, next) => {
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
