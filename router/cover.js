const express = require("express");
const router = express.Router();
const coverController = require('../controller/cover')

router.post('/createCover',coverController.createCover)
router.get('/getCovers',coverController.getCovers)
router.put('/updateCover',coverController.updateCover)
router.delete('/deleteCover',coverController.deleteCover)




module.exports = router;