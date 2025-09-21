const pool = require('../db');
const { invalidate } = require('../utils/cache');
const { updateCoPurchase } = require('../utils/recommendationEngine');

async function placeOrder(userId, products) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const res = await client.query(
            'INSERT INTO orders(user_id) VALUES($1) RETURNING order_id',
            [userId]
        );
        const orderId = res.rows[0].order_id;

        for (let { productId, quantity } of products) {
            await client.query(
                'INSERT INTO order_items(order_id, product_id, quantity) VALUES($1,$2,$3)',
                [orderId, productId, quantity]
            );
            await client.query(
                'UPDATE products SET stock = stock - $1 WHERE product_id = $2',
                [quantity, productId]
            );
        }

        await client.query('COMMIT');

        setImmediate(() => {
            updateCoPurchase(products.map(p => p.productId));
        });

        invalidate('trending_products');
        products.forEach(p => invalidate(`recommend_${p.productId}`));

        return orderId;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

module.exports = { placeOrder };
