
const User = require("../models/user");
require("dotenv").config();

exports.createUser = async (req, res, next) => {
  try {
    const { walletAddress, transactions } = req.body;

    const existingUser = await User.findOne({ walletAddress });

    if (existingUser) {
      const existingTransactions = existingUser.transactions || [];
      const updatedTransactions = [...existingTransactions, ...transactions];

      // Update existing user with the new transactions
      await User.findOneAndUpdate({ walletAddress }, { transactions: updatedTransactions });

      return res.status(200).json({ message: "Transactions appended to existing user", updatedTransactions });
    } else {
      // User doesn't exist, create a new user
      const newUser = await User.create({
        walletAddress,
        transactions,
      });

      return res.status(201).json({ message: "User created", newUser });
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
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