const pool = require('../db');
const { updateCoPurchase } = require('./recommendationEngine');
const { placeOrder } = require('../controllers/orderController'); 

const NUM_ORDERS = 200;
const MAX_PRODUCTS_PER_ORDER = 5;
const MAX_QUANTITY = 3;

async function getUserIds() {
    const res = await pool.query('SELECT user_id FROM users');
    return res.rows.map(r => r.user_id);
}

async function getProductIds() {
    const res = await pool.query('SELECT product_id FROM products WHERE stock > 0');
    return res.rows.map(r => r.product_id);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateOrders() {
    const users = await getUserIds();
    const products = await getProductIds();

    for (let i = 0; i < NUM_ORDERS; i++) {
        const userId = users[getRandomInt(0, users.length - 1)];

        const numProducts = getRandomInt(1, MAX_PRODUCTS_PER_ORDER);
        const selectedProducts = [];

        while (selectedProducts.length < numProducts) {
            const productId = products[getRandomInt(0, products.length - 1)];
            if (!selectedProducts.includes(productId)) selectedProducts.push(productId);
        }

        const productsWithQty = selectedProducts.map(pid => ({
            productId: pid,
            quantity: getRandomInt(1, MAX_QUANTITY),
        }));

        try {
            const orderId = await placeOrder(userId, productsWithQty);
            updateCoPurchase(productsWithQty.map(p => p.productId));
            console.log(`Order ${orderId} placed by User ${userId}`);
        } catch (err) {
            console.error('Error placing order:', err.message);
        }
    }
}
generateOrders().then(() => {
    console.log('Bulk order generation completed!');
    process.exit(0);
});
