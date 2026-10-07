const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "ValidationError",
        message: "Name and email are required."
      });
    }

    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "NotFound", message: "User not found." });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
