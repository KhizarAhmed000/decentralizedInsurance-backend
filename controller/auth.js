const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: 400, message: "user already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, salt);
      const newAdmin = await Admin.create({
        username,
        password: hashedPassword,
      });
      const obj = {
        _id: newAdmin._id,
        username: newAdmin.username,
      };
      const jwtSecret = process.env.JWT_SECRET;
      const token = await jwt.sign(obj, jwtSecret);
      return res.status(200).json({ message: "signup", newAdmin, token });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

exports.signin = async (req, res, next) => {
  const { username, password } = req.body;
  const existingAdmin = await Admin.findOne({ username });
  if (!existingAdmin) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
  const hashedPassword = existingAdmin.password;
  const verifyPassword = await bcrypt.compare(password, hashedPassword);
  if (!verifyPassword) {
    return res.status(400).json({ status: 400, message: "Incorrect Password" });
  }
  const obj = {
    username: existingAdmin.username,
    _id: existingAdmin._id,
  };
  const jwtSecret = process.env.JWT_SECRET;
  const token = await jwt.sign(obj, jwtSecret);
  return res.status(200).json({
    status: 200,
    message: "Login successfully",
    existingAdmin,
    token,
  });
  return res
    .status(200)
    .json({ status: 200, message: "Signin successfully", verifyPassword });
};
