const express = require("express"),
  {
    loginUser,
    registerUser,
    forgotPassword,
    logoutUser,
    resetPassword,
  } = require("../controllers/auth");
const {
  authenticationInputValidation,
} = require("../middlewares/inputValidation");

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/login", authenticationInputValidation, loginUser);

AuthenticationRouter.post("/logout", logoutUser);

AuthenticationRouter.post(
  "/register",
  authenticationInputValidation,
  registerUser
);

// POST /api/forgot-password
AuthenticationRouter.post("/forgot-password", forgotPassword);

// POST /api/reset-password
AuthenticationRouter.post("/reset-password", resetPassword);

module.exports = AuthenticationRouter;
