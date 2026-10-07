const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({
        error: "ValidationError",
        message: "Title, content and author are required."
      });
    }

    if (!mongoose.isValidObjectId(author)) {
      return res.status(400).json({
        error: "InvalidId",
        message: "Author ID is invalid."
      });
    }

    const authorExists = await User.exists({ _id: author });
    if (!authorExists) {
      return res.status(404).json({
        error: "NotFound",
        message: "Author not found."
      });
    }

    const post = await Post.create({ title, content, author });
    const populated = await post.populate("author", "name email");
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ error: "NotFound", message: "Post not found." });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    ).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ error: "NotFound", message: "Post not found." });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "NotFound", message: "Post not found." });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
