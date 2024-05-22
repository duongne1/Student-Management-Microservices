const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");
const port = process.env.PORT;
const middleware = require("./middleware/middlewareController");

app.use(cookieParser());

// Sử dụng createProxyMiddleware với retryMiddleware cho các dịch vụ

//course service

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 50 * 1000, // 5 giây
  max: 2,
  message: "Thử lại sau 10 giây",
  handler: (req, res) => {
    res.status(429).json({
      message: "Thử lại sau 10 giây",
    });
  },
});

app.use("/api/v1/users", limiter);

USER_URL = "http://localhost:3002";
COURSE_URL = "http://localhost:3001";
ENROLLMENT_URL = "http://localhost:3003";
GRADE_URL = "http://localhost:3004";
FEEDBACK_URL = "http://localhost:3005";

//courses service
app.use(
  "/service1",
  middleware.verifyToken,
  createProxyMiddleware({ target: process.env.COURSE_URL, changeOrigin: true })
);

//enrollment service
app.use(
  "/service3",
  middleware.verifyToken,
  createProxyMiddleware({
    target: process.env.ENROLLMENT_URL,
    changeOrigin: true,
  })
);
// //grade service
app.use(
  "/service4",
  middleware.verifyToken,
  createProxyMiddleware({ target: process.env.GRADE_URL, changeOrigin: true })
);

//feedback service
app.use(
  "/service5",
  middleware.verifyToken,
  createProxyMiddleware({
    target: process.env.FEEDBACK_URL,
    changeOrigin: true,
  })
);

//user service

app.use(
  "/",
  createProxyMiddleware({ target: process.env.USER_URL, changeOrigin: true })
);
app.use("/", limiter);
app.listen(port, () => {
  console.log("API GateWay ");
  console.log("Server is running on PORT: " + port);
});
