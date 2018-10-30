const express = require("express");
const CookieSession = require("cookie-session");
const passport = require("passport");
const Router = require("./routes/oauth-routes");
const passportSetup = require("./passport/passport-setup");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const profileRoute = require("./routes/profile-routes");
//creating app
const app = express();

// set view engine
app.set("view engine", "ejs");

//set up session cookies
app.use(
  CookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [keys.session.cookiesKeys]
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//create db connection
mongoose.connect(
  keys.mongodb.db,
  { useNewUrlParser: true },
  () => {
    console.log("mongodb is connected");
  }
);

// set up routes
app.use("/auth", Router);
app.use("/profile", profileRoute);
// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// use port 5000 unless there exists a preconfigured port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`you are listening port number ${port}`);
});
