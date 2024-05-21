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
app.use(
  "/service1",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3001", changeOrigin: true })
);

//enrollment service
app.use(
  "/service3",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3003", changeOrigin: true })
);
// //grade service
app.use(
  "/service4",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3004", changeOrigin: true })
);

//feedback service
app.use(
  "/service5",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3005", changeOrigin: true })
);

//user service
app.use(
  "/",
  createProxyMiddleware({ target: "http://localhost:3002", changeOrigin: true })
);
app.listen(port, () => {
  console.log("API GateWay ");
  console.log("Server is running on PORT: " + port);
});
