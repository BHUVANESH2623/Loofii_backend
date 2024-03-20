import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";
import userModel from "./models/users.js";

const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";
const GITHUB_CLIENT_ID = "";
const GITHUB_CLIENT_SECRET = "";

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        const user = await userModel.findOne({ userId: profile.id });
        if (!user) {
          const newuser = new userModel({
            userId: profile.id,
            username: profile.displayName,
            img:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : null,
            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : null,
          });

          await newuser.save();
          return cb(null, { user: newuser });
        }
        return cb(null, user);
      } catch (err) {
        console.log(err);
        return cb(err, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      scope: ["read:user", "user:email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await userModel.findOne({ userId: profile.id });
        if (!user) {
          const newuser = new userModel({
            userId: profile.id,
            username: profile.displayName,
            img: profile.photos[0].value,
            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : null,
          });

          await newuser.save();
          return cb(null, newuser);
        }
        return cb(null, user);
      } catch (err) {
        console.log(err);
        return cb(err, null);
      }
    }
  )
);

export default passport;
