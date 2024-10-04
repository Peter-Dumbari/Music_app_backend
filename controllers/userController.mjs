import User from "../models/userModel.mjs";

export const createUser = async (req, res) => {
  const email = req.body.email;

  let findUser = await User.findOne({ email });

  if (!findUser) {
    const newUser = await User.create(req.body);
    return res.json(newUser);
  } else
    res.json({
      msg: "User already exists",
      success: false,
    });
};
