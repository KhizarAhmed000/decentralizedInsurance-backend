const Claim = require("../models/claim");
require("dotenv").config();

exports.createClaim = async (req, res, next) => {
    try {
        const { protocol, coverType, ownerAddress, coverAmount, coverPeriod, lossTime, lossAmount, claimAmount, description } = req.body;

        
        if (!protocol || !coverType || !ownerAddress || !coverAmount || !coverPeriod) {
            return res.status(400).json({ status: 400, message: "Missing required fields",stuff:{protocol,coverType,ownerAddress,coverAmount,coverPeriod} });
        }

        const existingClaim = await Claim.findOne({ protocol });
        if (existingClaim) {
            return res.status(400).json({ status: 400, message: "Claim already exists" });
        }
        const newClaim = await Claim.create({
            protocol,
            coverType,
            ownerAddress,
            coverAmount,
            coverPeriod,
            lossTime,
            lossAmount,
            claimAmount,
            description,
            claimStatus:"Submitted",

        });
        return res.status(201).json({ message: "Claim added", newClaim });
    } catch (error) {
        
        console.error("Error creating claim:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateClaimStatus = async (req, res, next) => {
    try {
        const { protocol, newStatus } = req.body;
        const updatedClaim = await Claim.findOneAndUpdate(
            { protocol },
            { claimStatus: newStatus },
        );

        // Check if the claim exists
        if (!updatedClaim) {
            return res.status(404).json({ status: 404, message: "Claim not found" });
        }

        // Return success response
        return res.status(200).json({ message: "Claim status updated", updatedClaim });
    } catch (error) {
        // Handle internal server error
        console.error("Error updating claim status:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteClaim = async (req, res, next) => {
    try {
        const { protocol } = req.body;
        const deletedClaim = await Claim.findOneAndDelete({ protocol });
        if (!deletedClaim) {
            return res.status(404).json({ status: 404, message: "Claim not found" });
        }
        return res.status(200).json({ message: "Claim deleted", deletedClaim });
    } catch (error) {

        console.error("Error deleting claim:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllClaims = async (req, res, next) => {
    try {
        const allClaims = await Claim.find();
        return res.status(200).json(allClaims);
    } catch (error) {
        console.error("Error fetching claims:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getClaim = async (req, res, next) => {
    try {
        const { protocol } = req.body;


        const claim = await Claim.findOne({ protocol });


        if (!claim) {
            return res.status(404).json({ status: 404, message: "Claim not found" });
        }


        return res.status(200).json(claim);
    } catch (error) {

        console.error("Error fetching claim:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};