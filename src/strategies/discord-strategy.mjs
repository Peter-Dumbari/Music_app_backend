import passport from "passport";
import { Strategy } from "passport-discord";

export default passport.use(
  new Strategy({
    clientID: "1288468034020835380",
    clientSecret: "4LWGTtkwEKwtL7p4XWn6geKrG1edTnlA",
    callbackURL: "http://localhost:3000/api/v1/auth/discord/redirect",
    scope: ["identify", "guilds"],
  }),
  (accessToken, refreshToken, profile, done) => {
    console.log("profile", profile);
  }
);
