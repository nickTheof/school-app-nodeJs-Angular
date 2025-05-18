const validateQuery = (schema) => (req, res, next) => {
  try {
    req.query = schema.parse(req.query);
    next();
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "Query validation error",
      errors: err.errors,
    });
  }
};

module.exports = validateQuery;
