const pool = require('../db');
const { recommend } = require('../utils/recommendationEngine');

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
function getRecommendations(req, res) {
    const productId = req.params.productId;
    const recs = recommend(productId);
    res.json({ productId, recommendations: recs });
}

async function calculateCategorySales(categoryId) {
    const res = await pool.query(
        'SELECT category_id FROM categories WHERE parent_id = $1',
        [categoryId]
    );
    const subcategories = res.rows.map(r => r.category_id);

    const prodRes = await pool.query(
        `SELECT COALESCE(SUM(oi.quantity * p.price),0) AS revenue
         FROM products p
         LEFT JOIN order_items oi USING(product_id)
         WHERE p.category_id = $1`,
         [categoryId]
    );
    let totalRevenue = parseFloat(prodRes.rows[0].revenue) || 0;

    for (const subId of subcategories) {
        totalRevenue += await calculateCategorySales(subId);
    }
    return totalRevenue;
}

async function getCategoryAnalytics(req, res) {
    const categoryId = req.params.id;
    try {
        const totalRevenue = await calculateCategorySales(categoryId);
        res.json({ categoryId, totalRevenue });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports = { getTrendingProducts, getRecommendations, getCategoryAnalytics };
