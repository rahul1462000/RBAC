const express = require("express");
const router = express.Router();
const Permission = require("../models/Permission");

// POST: Create a new permission
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newPermission = new Permission({ name, description });
    await newPermission.save();
    res.status(201).json(newPermission);
  } catch (err) {
    res.status(500).json({ message: "Error creating permission" });
  }
});

// GET: Get all permissions
router.get("/", async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching permissions" });
  }
});

module.exports = router;
