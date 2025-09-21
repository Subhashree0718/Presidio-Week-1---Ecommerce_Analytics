const express = require('express');
const bodyParser = require('body-parser');
const analyticsRoutes = require('./routes/analytics');
const { placeOrder } = require('./controllers/orderController');

const app = express();
app.use(bodyParser.json());

app.use('/api/analytics', analyticsRoutes);
app.post('/api/order', async (req, res) => {
    try {
        const orderId = await placeOrder(req.body.userId, req.body.products);
        res.json({ orderId });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
