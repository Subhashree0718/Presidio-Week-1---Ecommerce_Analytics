
const express = require('express');
const router = express.Router();
const { 
    getTrendingProducts, 
    getRecommendations, 
    getCategoryAnalytics,
    getTopUsers
} = require('../controllers/analyticsController');

router.get('/trending', getTrendingProducts);
router.get('/recommend/:productId', getRecommendations);
router.get('/category/:id', getCategoryAnalytics);
router.get('/top-users', getTopUsers);
module.exports = router;
