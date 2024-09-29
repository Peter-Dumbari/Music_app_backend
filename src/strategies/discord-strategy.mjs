import passport from "passport";
import Strategy from "passport-discord";
import { DiscordUser } from "../mongoose/schema/discord-user.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

export default passport.use(
  new Strategy(
    {
      clientID: "1288468034020835380",
      clientSecret: "4LWGTtkwEKwtL7p4XWn6geKrG1edTnlA",
      callbackURL: "http://localhost:3000/api/v1/auth/discord/redirect",
      scope: ["identify", "guilds", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      //   console.log("profile", profile);

      let findUser;

      try {
        findUser = await DiscordUser.findOne({ discordId: profile.id });
      } catch (error) {
        done(error, null);
      }

      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });

          const saveNewUser = await newUser.save();
          return done(null, saveNewUser);
        }
        return done(null, findUser);
      } catch (error) {
        console.log("error", error);
        return done(error, null);
      }
    }
  )
);
