const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

const app = express();
app.use(express.json());

// BUG 1: no validation before creating users
app.post("/api/v1/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// BUG 2: invalid IDs can throw CastError and reach no controlled response
app.get("/api/v1/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author");
  if (!post) return res.status(200).json({});
  res.json(post);
});

// BUG 3: no author/post existence checks
app.post("/api/v1/comments", async (req, res) => {
  const comment = await Comment.create(req.body);
  res.status(201).json(comment);
});

// BUG 4: unbounded post query
app.get("/api/v1/posts", async (req, res) => {
  const posts = await Post.find().populate("author");
  res.json(posts);
});

// BUG 5: unbounded comment query and no post filter validation
app.get("/api/v1/comments", async (req, res) => {
  const filter = req.query.post ? { post: req.query.post } : {};
  const comments = await Comment.find(filter).populate("author").populate("post");
  res.json(comments);
});

// BUG 6: unknown routes return HTML/default Express response
// BUG 7: no centralized async error handler

module.exports = app;
