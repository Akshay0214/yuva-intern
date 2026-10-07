const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Post = require("../models/Post");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { content, author, post } = req.body;

    if (!content || !author || !post) {
      return res.status(400).json({
        error: "ValidationError",
        message: "Content, author and post are required."
      });
    }

    if (!mongoose.isValidObjectId(author) || !mongoose.isValidObjectId(post)) {
      return res.status(400).json({
        error: "InvalidId",
        message: "Author or post ID is invalid."
      });
    }

    const [authorExists, postExists] = await Promise.all([
      User.exists({ _id: author }),
      Post.exists({ _id: post })
    ]);

    if (!authorExists) {
      return res.status(404).json({ error: "NotFound", message: "Author not found." });
    }

    if (!postExists) {
      return res.status(404).json({ error: "NotFound", message: "Post not found." });
    }

    const comment = await Comment.create({ content, author, post });
    const populated = await comment.populate([
      { path: "author", select: "name email" },
      { path: "post", select: "title" }
    ]);

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const filter = req.query.post ? { post: req.query.post } : {};
    const comments = await Comment.find(filter)
      .populate("author", "name email")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("author", "name email")
      .populate("post", "title");

    if (!comment) {
      return res.status(404).json({ error: "NotFound", message: "Comment not found." });
    }

    res.json(comment);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true, runValidators: true }
    )
      .populate("author", "name email")
      .populate("post", "title");

    if (!comment) {
      return res.status(404).json({ error: "NotFound", message: "Comment not found." });
    }

    res.json(comment);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: "NotFound", message: "Comment not found." });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
