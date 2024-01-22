
const User = require("../models/user");
require("dotenv").config();

exports.createUser = async (req, res, next) => {
    try {
      const { walletAddress, transactions } = req.body;
  
      const existingUser = await User.findOne({ walletAddress });
  
      if (existingUser) {
        return res.status(400).json({ status: 400, message: "User already exists" });
      } else {
        const newUser = await User.create({
          walletAddress,
          transactions,
        });
  
        return res.status(201).json({ message: "User created", newUser });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };


  exports.getUser = async (req, res, next) => {
    try {
      const { walletAddress } = req.body;
  
      const user = await User.findOne({ walletAddress });
  
      if (user) {
        return res.status(200).json({ message: "User found", user });
      } else {
        return res.status(404).json({ status: 404, message: "User not found" });
      }
    } catch (error) {
      console.error("Error getting user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };