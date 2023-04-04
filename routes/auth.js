const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const RefreshToken = require("../models/refreshToken");

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Email does not exists in the DB." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect email or password." });
  }

  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  await new RefreshToken({ token: refreshToken }).save();

  res.json({ accessToken, refreshToken });
});

AuthenticationRouter.post("/logout", async (req, res) => {
  const refreshToken = req.body.token;
  await RefreshToken.findOneAndDelete({ token: refreshToken });
  res.sendStatus(204);
});

module.exports = AuthenticationRouter;
