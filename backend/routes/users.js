const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get All Users
router.get("/", authMiddleware, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add User
router.post("/", async (req, res) => {
  const { name, email, password, roles } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, roles });
  await newUser.save();
  res.json(newUser);
});

// Update User
router.put("/:id", async (req, res) => {
  const { name, roles, status } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { name, roles, status }, { new: true });
  res.json(user);
});

// Delete User
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
