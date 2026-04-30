const express = require('express');
const router = express.Router();
const { getHomeContent } = require('../controllers/contentController');

// GET aggregated home content
router.get('/home', getHomeContent);

module.exports = router;
