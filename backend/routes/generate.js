var express = require('express');
var router = express.Router();
const { generateResult } = require('../controllers/generateControllers');
const upload = require('../middleware/upload');
const authMiddleware = require('../middleware/authMiddleware');

//this is the router which will handle all the apis related to the generations
router.post("/", authMiddleware, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 }
]), generateResult);

module.exports = router;
