const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roles: [String],
  status: { type: String, default: "Active" },
});

module.exports = mongoose.model("User", UserSchema);
