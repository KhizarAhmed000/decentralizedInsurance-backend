const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
    protocol: String,
    coverType:String,
    ownerAddress:String,
    coverAmount:Number,
    coverPeriod:Number,
    lossTime:String,
    lossAmount:Number,
    claimAmount:Number,
    description:String,
    claimStatus:String
  });

  const Claim = mongoose.model("Claim", ClaimSchema);
module.exports = Claim;