const express = require("express");
const router = express.Router();
const claimController = require('../controller/claim')

router.post('/createClaim',claimController.createClaim)
router.get('/getClaims',claimController.getAllClaims)
router.get('/getClaims',claimController.getClaim)
router.put('/updateClaimStatus',claimController.updateClaimStatus)
router.delete('/deleteClaim',claimController.deleteClaim)




module.exports = router;