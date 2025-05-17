const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const errorController = require("./middlewares/error.middleware");
const limiter = require("./middlewares/limiter.middleware");
const AppError = require("./utils/AppError");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const cityRouter = require("./routes/city.routes");
const teacherRouter = require("./routes/teacher.routes");
const studentRouter = require("./routes/student.routes");

const app = express();

// Use helmet for setting security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Configure the allowed origins for this backend API
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",") || [];
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(
  hpp({
    whitelist: [],
  })
);

app.use("/", limiter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/students", studentRouter);

app.all("/{*splat}", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} on the server`, 404));
});

// Add global error middleware
app.use(errorController);

module.exports = app;
