const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refreshTokens: [{ type: String }],
  role: { type: String, default: "business" },
  verified: { type: Boolean, default: false },
  picture:{type: String, default:"https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1"}
});

module.exports = mongoose.model("User", userSchema);
