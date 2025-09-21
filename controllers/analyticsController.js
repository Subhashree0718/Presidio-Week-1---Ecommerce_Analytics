const pool = require('../db');

async function getTrendingProducts(req, res) {
    try {
        const result = await pool.query(
            `SELECT product_id, name, SUM(quantity) AS total_sold 
             FROM order_items 
             JOIN products USING(product_id) 
             GROUP BY product_id, name 
             ORDER BY total_sold DESC LIMIT 10`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = { getTrendingProducts };
