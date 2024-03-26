const Cover = require("../models/cover");
require("dotenv").config();

exports.createCover = async (req, res, next) => {
  try {
    const { protocol, dailyCost, capacity, securityRating, coverType,imageURL } =
      req.body;
    const existingCover = await Cover.findOne({ protocol });
    if (existingCover) {
      return res
        .status(400)
        .json({ status: 400, message: "cover already exists" });
    } else {
      const newCover = await Cover.create({
        protocol,
        dailyCost,
        capacity,
        securityRating,
        coverType,
        imageURL
      });
      return res.status(200).json({ message: "cover added", newCover });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

exports.getCovers = async (req, res, next) => {
  try {
    const allCovers = await Cover.find();
    return res.status(200).json({ message: "Success", covers: allCovers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteCover = async (req, res, next) => {
  try {
    const { protocol } = req.body;
    const existingCover = await Cover.findOne({ protocol });
    console.log(existingCover, "getting data");

    if (existingCover) {
    await Cover.deleteOne({ protocol });
      console.log("deleted cover");
      return res.status(200).json({ message: "cover deleted", existingCover });
    } else {
      return res.status(404).json({ status: 404, message: "cover not found" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "internal server error" });
  }
};

exports.updateCover = async (req, res, next) => {
  try {
    const { protocol, dailyCost, capacity, securityRating, coverType,imageURL } =
      req.body;
 
    const existingCover = await Cover.findOne({ protocol });

    if (!existingCover) {
      return res.status(404).json({ status: 404, message: "Cover not found" });
    }

    existingCover.protocol = protocol;
    existingCover.dailyCost = dailyCost;
    existingCover.capacity = capacity;
    existingCover.securityRating = securityRating;
    existingCover.coverType = coverType;
    existingCover.imageURL = imageURL;

    const updatedCover = await existingCover.save();

    return res.status(200).json({ message: "Cover updated", updatedCover });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
