const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//creating new google strategy instance
passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: "",
    clientSecret: "",
    callbackURI: ""
  }),
  () => {
    // passport callback function
  }
);
