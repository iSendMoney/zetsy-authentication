const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refreshTokens: [{ type: String }],
  role: { type: String, default: "business" },
  verified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
