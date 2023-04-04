const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const RefreshToken = require("../models/refreshToken");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user with the provided email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Incorrect email or password." });
  }

  // Compare the provided password with the user's hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect email or password." });
  }

  // Generate an access token
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  // Generate a refresh token
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Save the refresh token to the database
  await new RefreshToken({ token: refreshToken }).save();

  res.json({ accessToken, refreshToken });
});

// Logout route
router.post("/logout", async (req, res) => {
  const refreshToken = req.body.token;

  // Delete the refresh token from the database
  await RefreshToken.findOneAndDelete({ token: refreshToken });

  res.sendStatus(204);
});

module.exports = router;
