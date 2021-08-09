// Require package dependencies
const express = require("express");
// const { auth, requiresAuth } = require("express-openid-connect");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Require local files
require("./src/db/mongoose");
const tokenRouter = require("./src/routers/token");
const userRouter = require("./src/routers/user");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(tokenRouter);
app.use(userRouter);

// Declare port
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Sass-80 Api");
});

// app.get("/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// Serve app
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
