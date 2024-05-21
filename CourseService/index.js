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
// routes
const courseRoute = require("./routers/courseRouter");

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// database connection
const dbURI = process.env.MONGODB_URI;
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection failed:", error);
  });
// routes
app.use("/api/v1/courses", courseRoute);

app.use(function (req, res) {
  res.status(404).send("Not found");
});
// Bắt đầu server và lắng nghe các kết nối tới
server.listen(port, ip, () => {
  console.log("Server is running on IP: " + ip);
  console.log("Server is running on PORT: " + port);
  console.log("Server is running on DB: " + mongodb);
});
