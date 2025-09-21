const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');

router.post('/', async (req, res) => {
    try {
        const { userId, products } = req.body;
        const orderId = await placeOrder(userId, products);
        res.json({ orderId });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
