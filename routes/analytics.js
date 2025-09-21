const express = require('express');
const router = express.Router();
const { getTrendingProducts } = require('../controllers/analyticsController');

router.get('/trending', getTrendingProducts);

module.exports = router;
