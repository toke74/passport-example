const express = require("express");
const Router = require("./routes/oauth-routes");

//creating app
const app = express();

// set view engine
app.set("view engine", "ejs");

// set up routes
app.use("/auth", Router);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

// use port 5000 unless there exists a preconfigured port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`you are listening port number ${port}`);
});
