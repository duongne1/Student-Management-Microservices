const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  dateofbirth: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  gender: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "admin", "teacher"],
    default: "student",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
