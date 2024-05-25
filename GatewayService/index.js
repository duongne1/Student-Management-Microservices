const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");
const port = process.env.PORT;
const middleware = require("./middleware/middlewareController");
const breaker = require("./circuitBreaker/circuitBreaker");
app.use(cookieParser());

// Sử dụng createProxyMiddleware với retryMiddleware cho các dịch vụ

//course service

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 30 * 1000, // 5 giây
  max: 1,
  message: "Thử lại sau 30 giây",
  handler: (req, res) => {
    res.status(429).json({
      message: "Thử lại sau 30 giây",
    });
  },
});

// app.use("/api/v1/users", limiter);



//courses service
app.use(
  "/service1",
  middleware.verifyToken,
  createProxyMiddleware({ target: process.env.COURSE_URL, changeOrigin: true })
);

//enrollment service
app.use("/service3", middleware.verifyToken, (req, res) => {
  breaker
    .fire(req, res)
    .then(() => {
      if (!res.headersSent) {
        res.end();
      }
    })
    .catch((err) => {
      // console.error("Error:", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Service đạng tạm đóng!" });
      }
    });
});
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
//client sẽ gọi đến uservice qua gateway
app.use(
  "/service6",
  limiter,
  createProxyMiddleware({ target: process.env.USER_URL, changeOrigin: true })
);
app.use(
  "/",
  createProxyMiddleware({ target: process.env.USER_URL, changeOrigin: true })
);

app.use("/", middleware.verifyToken, (req, res) => {
  breaker
    .fire(req, res)
    .then(() => {
      if (!res.headersSent) {
        res.end();
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Service đạng tạm đóng trong 10s!" });
      }
    });
});

app.listen(port, () => {
  console.log("API GateWay ");
  console.log("Server is running on PORT: " + port);
});
