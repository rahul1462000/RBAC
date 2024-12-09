const express = require("express");
const router = express.Router();
const Role = require("../models/Role");

// POST: Create a new role
router.post("/", async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newRole = new Role({ name, permissions });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(500).json({ message: "Error creating role" });
  }
});

// GET: Get all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching roles" });
  }
});

module.exports = router;
