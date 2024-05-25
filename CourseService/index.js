const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const retry = require("retry"); // Import thư viện retry
require("dotenv").config();
const cors = require("cors");
const app = express();
const http = require("http");
const cookieParser = require("cookie-parser");
const server = http.createServer(app);
const ip = process.env.IP;
const port = process.env.PORT;
const mongodb = process.env.MONGODB_URI;

// Routes
const courseRoute = require("./routers/courseRouter");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Database connection
const dbURI = process.env.MONGODB_URI;

const connectWithRetry = async () => {
  const operation = retry.operation({
    retries: 5, // Số lần thử lại
    factor: 2, // Hệ số tăng thời gian chờ giữa các lần thử lại
    minTimeout: 1000, // Thời gian chờ tối thiểu trước khi thử lại lần đầu tiên
    maxTimeout: 5000, // Thời gian chờ tối đa giữa các lần thử lại
  });

  return new Promise((resolve, reject) => {
    operation.attempt(async (currentAttempt) => {
      try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        resolve();
      } catch (error) {
        console.log(`MongoDB connection attempt ${currentAttempt} failed:`, error.message);
        if (operation.retry(error)) {
          console.log(`Retrying to connect to MongoDB in ${operation._timeouts.current} milliseconds...`);
          return;
        }
        reject(operation.mainError());
      }
    });
  });
};

connectWithRetry().then(() => {
  // Routes
  app.use("/api/v1/courses", courseRoute);

  app.use(function (req, res) {
    res.status(404).send("Not found");
  });

  // Start the server
  server.listen(port, ip, () => {
    console.log(`Server is running on IP: ${ip}`);
    console.log(`Server is running on PORT: ${port}`);
    console.log(`Server is running on DB: ${mongodb}`);
  }).on("error", (err) => {
    process.exit(1);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB after multiple attempts");
  process.exit(1);
});
