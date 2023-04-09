const express = require("express"),
  {
    loginUser,
    registerUser,
    forgotPassword,
    logoutUser,
    resetPassword,
  } = require("../controllers/auth");

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/login", loginUser);

AuthenticationRouter.post("/logout", logoutUser);

AuthenticationRouter.post("/register", registerUser);

// POST /api/forgot-password
AuthenticationRouter.post("/forgot-password", forgotPassword);

// POST /api/reset-password
AuthenticationRouter.post("/reset-password", resetPassword);

module.exports = AuthenticationRouter;
