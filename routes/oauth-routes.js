const router = require("express").Router();

//auth login
router.get("/login", (req, res) => {
  res.render("login");
});

//auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  res.send("auth logout");
});

// auth with google+
router.get("/google", (req, res) => {
  // handle with passport
  res.send("logging in with Google");
});

// auth with google+
router.get("/facebook", (req, res) => {
  // handle with passport
  res.send("logging in with Facebook");
});

module.exports = router;
