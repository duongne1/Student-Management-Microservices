const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      return res.status(400).json({ error: "Username is incorrect" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Password is incorrect" });
    }
    if (user && validPassword) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "1000s" }
      );
      const maxAge = 86400000; // Thời gian sống là 24 giờ (24 * 60 * 60 * 1000)
      res.cookie("accessToken", accessToken, { maxAge: maxAge });
      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const signup = async (req, res) => {
  const { name, username, password, dateofbirth, email, gender } = req.body;
  try {
    // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu chưa
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    // Tạo salt và hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Tạo tài khoản mới
    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
      dateofbirth: dateofbirth,
      email: email,
      gender: gender,
    });
    // Lưu tài khoản mới vào cơ sở dữ liệu
    await newUser.save();
    // Trả về tài khoản mới đã được tạo
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  login,
  signup,
  getUserById,
  getAllUser,
};
