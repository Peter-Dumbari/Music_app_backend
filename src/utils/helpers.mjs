import bcrypt from "bcrypt";

const saltRounds = 10;

export const harshPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log("salt", salt);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain, harshed) =>
  bcrypt.compareSync(plain, harshed);
