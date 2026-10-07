const express = require("express");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok", service: "week2-blog-api" });
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/comments", commentsRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "NotFound",
    message: "API route not found."
  });
});

app.use(errorHandler);

module.exports = app;
