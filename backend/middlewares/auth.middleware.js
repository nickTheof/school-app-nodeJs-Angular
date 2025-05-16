const AppError = require("../utils/AppError");
const authService = require("../services/auth.services");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError("Access denied. No token provided", 401));
  }
  const credentials = authService.verifyAccessToken(token);
  if (!credentials.verified) {
    return next(new AppError(credentials.data, 403));
  }
  req.user = credentials.data;
  next();
};

exports.verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return next(new AppError("Forbidden: no roles found", 403));
    }
    const userRoles = req.user.roles;
    const hasPermission = userRoles.some((role) => allowedRoles.includes(role));
    if (!hasPermission) {
      return next(new AppError("Forbidden: insufficient permissions", 403));
    }
    next();
  };
};
