export const errorHandler = (err, req, res, next) => {
  const error = {
    message: err.message || "somthing wronge please try again",
    status: err.statusCode || 500,
  };
  if (err.name === "ValidationError") {
    error.message = `${Object.values(err.errors).map(
      (value) =>
        `${value.path}:${
          value.kind === "user defined" ? "notValide" : value.kind
        }`
    )}`;
    error.status = 400;
  }
  if (err.code === 11000) {
    error.message = "email:duplicate";
    error.status = 400;
  }
  //   res.json(err);
  res.status(error.status).json({ message: error.message });
};
