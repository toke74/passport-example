const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//load local file
const User = require("../models/user-model");
const secretKeys = require("../config/keys");

//create route for sign up
router.post("/local/signup", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json({ email: "user exist" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      //hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//create route for login
router.post("/local/login", (req, res) => {
  //   const email = req.body.email;

  console.log(req.body.email);
  const password = req.body.password;

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    //check a password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        res.status(404).json({ password: "Password incorrect" });
      } else {
        // User Matched

        // Create JWT Payload
        const payload = { id: user.id, name: user.name };

        // Sign Token
        jwt.sign(
          payload,
          secretKeys.jwtSecreteKeys,
          { expiresIn: 60 * 60 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
    });
  });
});

//auth login
router.get("/auth/login", (req, res) => {
  res.render("login", { user: req.user });
});

//auth logout
router.get("/auth/logout", (req, res) => {
  // handle with passport
  //res.send("auth logout");
  req.logout();
  res.redirect("/");
});

// auth with google+
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// callback route for google to redirect to
router.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    // res.send("you reached the redirect URI + approved");
    //res.send(req.user);
    res.redirect("/profile");
  }
);

//create secured route
router.get(
  "/api/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
    // res.redirect("/profile");
  }
);

module.exports = router;
