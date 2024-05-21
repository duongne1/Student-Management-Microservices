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
app.use(
  "/service1",
  middleware.verifyToken,
  createProxyMiddleware({ target: "http://localhost:3001", changeOrigin: true })
);

app.use(
  "/",

  createProxyMiddleware({ target: "http://localhost:3002", changeOrigin: true })
);

// Các dịch vụ khác có thể được thêm vào tương tự
// app.use(
//   "/service3",
//   middleware.verifyToken,
//   createProxyMiddleware({ target: "http://localhost:3003", changeOrigin: true })
// );
// app.use(
//   "/service4",
//   middleware.verifyToken,
//   createProxyMiddleware({ target: "http://localhost:3004", changeOrigin: true })
// );
// app.use(
//   "/service5",
//   middleware.verifyToken,
//   createProxyMiddleware({ target: "http://localhost:3005", changeOrigin: true })
// );

app.listen(3000, () => {
  console.log("Server is running on PORT: " + 3000);
});
