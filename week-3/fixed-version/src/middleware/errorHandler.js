function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "ValidationError",
      message: Object.values(err.errors).map((e) => e.message).join(", ")
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      error: "DuplicateResource",
      message: "A resource with the same unique value already exists."
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "InvalidId",
      message: "The supplied resource ID is invalid."
    });
  }

  return res.status(500).json({
    error: "InternalServerError",
    message: "An unexpected server error occurred."
  });
}

module.exports = errorHandler;
