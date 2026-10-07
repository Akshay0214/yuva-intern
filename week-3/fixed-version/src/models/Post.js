const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 150
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minlength: 10
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
