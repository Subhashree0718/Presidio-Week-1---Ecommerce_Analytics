const { set, get } = require('../utils/cache');
const pool = require('../db'); 
async function calculateCategorySales(categoryId) {
    const res = await pool.query(
        'SELECT category_id FROM categories WHERE parent_id = $1',
        [categoryId]
    );
    const subcategories = res.rows.map(r => r.category_id);
    const prodRes = await pool.query(
        `SELECT COALESCE(SUM(oi.quantity * p.price), 0) AS revenue
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
async function getTrendingProducts(req, res) {
    const cacheKey = 'trending_products';
    const cached = get(cacheKey);
    if (cached) return res.json(cached);
    try {
        const result = await pool.query(
            `SELECT product_id, name, SUM(quantity) AS total_sold 
             FROM order_items 
             JOIN products USING(product_id) 
             GROUP BY product_id, name 
             ORDER BY total_sold DESC LIMIT 10`
        );
        set(cacheKey, result.rows);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
function getRecommendations(req, res) {
    const productId = req.params.productId;
    const cacheKey = `recommend_${productId}`;
    const cached = get(cacheKey);
    if (cached) return res.json(cached);
    const { recommend } = require('../utils/recommendationEngine');
    const recs = recommend(productId);
    const result = { productId, recommendations: recs };
    set(cacheKey, result);
    res.json(result);
}
async function getCategoryAnalytics(req, res) {
    const categoryId = req.params.id;
    const cacheKey = `category_${categoryId}`;
    const cached = get(cacheKey);
    if (cached) return res.json(cached);
    try {
        const totalRevenue = await calculateCategorySales(categoryId);
        const result = { categoryId, totalRevenue };
        set(cacheKey, result);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
async function getTopUsers(req, res) {
    const cacheKey = 'top_users';
    const cached = get(cacheKey);
    if (cached) return res.json(cached);
    try {
        const result = await pool.query(
            `SELECT u.user_id, u.name, COUNT(o.order_id) AS total_orders,
                    COALESCE(SUM(oi.quantity * p.price),0) AS total_spent
             FROM users u
             LEFT JOIN orders o ON u.user_id = o.user_id
             LEFT JOIN order_items oi ON o.order_id = oi.order_id
             LEFT JOIN products p ON oi.product_id = p.product_id
             GROUP BY u.user_id, u.name
             ORDER BY total_orders DESC, total_spent DESC
             LIMIT 10`
        );
        set(cacheKey, result.rows); 
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
module.exports = { getTrendingProducts, getRecommendations, getCategoryAnalytics, getTopUsers };
