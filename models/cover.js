const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoverSchema = new Schema({
    protocol: String,
    dailyCost: Number,
    capacity: Number,
    securityRating: String,
    coverType: String,
    imageURL:String,
  });

  const Cover = mongoose.model("Cover", CoverSchema);
module.exports = Cover;