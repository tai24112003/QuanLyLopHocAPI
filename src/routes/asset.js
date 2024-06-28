const express = require('express');

const AssetController = require('../controllers/AssetController');
const uploadImage = require('../midlewares/uploadImage');

let router = express.Router();

router.post('/',uploadImage ,AssetController.upload);

module.exports = router;
