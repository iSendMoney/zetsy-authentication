const { loginUser } = require("../controllers/login");
const { registerUser } = require("../controllers/register");

const AuthenticationRouter = require("express").Router();

AuthenticationRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

// @note this is user registration router
AuthenticationRouter.post("/register", registerUser);

// @note this is user login router
AuthenticationRouter.post("/login", loginUser);

module.exports = AuthenticationRouter;
