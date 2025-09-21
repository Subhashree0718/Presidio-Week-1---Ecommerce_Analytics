const express = require('express');
const router = express.Router();
const { getTrendingProducts } = require('../controllers/analyticsController');

router.get('/trending', getTrendingProducts);
router.get('/recommend/:productId', getRecommendations);
router.get('/category/:id', getCategoryAnalytics);

module.exports = router;
