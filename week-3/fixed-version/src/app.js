const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok", service: "week3-debug-api" });
});

app.post("/api/v1/users", async (req, res, next) => {
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

app.get("/api/v1/posts", async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 50);
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .select("title content author createdAt")
        .populate("author", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments()
    ]);

    res.json({
      data: posts,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
});

app.get("/api/v1/posts/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: "InvalidId",
        message: "Post ID is invalid."
      });
    }

    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .lean();

    if (!post) {
      return res.status(404).json({
        error: "NotFound",
        message: "Post not found."
      });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
});

app.post("/api/v1/comments", async (req, res, next) => {
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
      return res.status(404).json({
        error: "NotFound",
        message: "Author not found."
      });
    }

    if (!postExists) {
      return res.status(404).json({
        error: "NotFound",
        message: "Post not found."
      });
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

app.get("/api/v1/comments", async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 50);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.post) {
      if (!mongoose.isValidObjectId(req.query.post)) {
        return res.status(400).json({
          error: "InvalidId",
          message: "Post ID is invalid."
        });
      }
      filter.post = req.query.post;
    }

    const [comments, total] = await Promise.all([
      Comment.find(filter)
        .select("content author post createdAt")
        .populate("author", "name email")
        .populate("post", "title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Comment.countDocuments(filter)
    ]);

    res.json({
      data: comments,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "NotFound",
    message: "API route not found."
  });
});

app.use(errorHandler);

module.exports = app;
