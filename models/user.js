const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    walletAddress: String,
    transactions: [
        {
          protocol: String,
          days: Number,
          coveredAddress: String,
          amount: Number,
        },
      ],
  });

  const User = mongoose.model("User", UserSchema);
module.exports = User;