const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refreshTokens: [{ type: String }],
});

module.exports = mongoose.model("User", userSchema);
