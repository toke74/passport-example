const router = require("express").Router();
const passport = require("passport");

//auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

//auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  //res.send("auth logout");
  req.logout();
  res.redirect("/");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// auth with google+
router.get("/facebook", (req, res) => {
  // handle with passport
  res.send("logging in with Facebook");
});

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send("you reached the redirect URI + approved");
  //res.send(req.user);
  res.redirect("/profile");
});

module.exports = router;
