const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//creating new google strategy instance
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      console.log(profile);

      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have this user
          console.log("Returning  user is: ", currentUser);
          done(null, currentUser);
          // do something
        } else {
          // if not, create user in our db
          new User({
            googleId: profile.id,
            username: profile.displayName
          })
            .save()
            .then(newUser => {
              console.log("created new user: ", newUser);
              done(null, newUser);
              // do something
            });
        }
      });
    }
  )
);
