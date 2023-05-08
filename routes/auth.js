const express = require("express"),
  {
    loginUser,
    registerUser,
    forgotPassword,
    resetPassword,
    verifyUser,
  } = require("../controllers/auth"),
  { authenticationInputValidation } = require("../middlewares/inputValidation");

const AuthenticationRouter = express.Router();

// POST User Authentication
AuthenticationRouter.post("/login", authenticationInputValidation, loginUser)
  .post("/register", authenticationInputValidation, registerUser)
  .post("/forgot-password", forgotPassword)
  .post("/reset-password", resetPassword)
  .get("/verify-email", verifyUser);

module.exports = AuthenticationRouter;
