const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
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
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });

// Routes
app.use("/api/v1/courses", courseRoute);

app.use(function (req, res) {
  res.status(404).send("Not found");
});

// Function to start server with retry logic
const startServerWithRetry = (retryCount = 5, retryDelay = 3000) => {
  const tryStartServer = (attemptsLeft) => {
    if (attemptsLeft <= 0) {
      console.error("Failed to start server after multiple attempts");
      process.exit(1); // Exit the process if all retries fail
    }

    server
      .listen(port, ip, () => {
        console.log(`Server is running on IP: ${ip}`);
        console.log(`Server is running on PORT: ${port}`);
        console.log(`Server is running on DB: ${mongodb}`);
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(
            `Failed to start server on port ${port}: ${err.message}`
          );
          console.log(
            `Retrying to start server in ${retryDelay / 1000} seconds... (${
              attemptsLeft - 1
            } attempts left)`
          );
          setTimeout(() => {
            tryStartServer(attemptsLeft - 1);
          }, retryDelay);
        } else {
          console.error(`Error: ${err.message}`);
          process.exit(1); // Exit immediately for non EADDRINUSE errors
        }
      });
  };

  tryStartServer(retryCount);
};

// Start the server with retry logic
startServerWithRetry();
