import passport from "passport";
import { Strategy } from "passport-local";
import { mockUser } from "../utils/constants.mjs";
import { User } from "../mongoose/schema/user.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// passport.deserializeUser((id, done) => {
//   try {
//     const findUser = mockUser.find((user) => user.id === id);
//     if (!findUser) throw new Error("User not found");
//     done(null, findUser);
//   } catch (err) {
//     done(err, null);
//   }
// });

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

// export default passport.use(
//   new Strategy((username, password, done) => {
//     console.log("password", password);
//     console.log("username", username);
//     try {
//       const findUser = mockUser.find((user) => user.name === username);

//       if (!findUser) {
//         throw new Error("user not found");
//       }

//       if (findUser.password !== password)
//         throw new Error("Invalid Credentials");
//       done(null, findUser);
//     } catch (err) {
//       done(err, null);
//     }
//   })
// );

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log("username", username);
    console.log("password", password);

    try {
      const findUser = await User.findOne({ username });
      if (!findUser) return res.status(404).send({ msg: "User not found" });
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
