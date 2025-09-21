const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
});

router.post('/', async (req, res) => {
    const { name, category_id, price, stock } = req.body;
    const result = await pool.query(
        'INSERT INTO products(name, category_id, price, stock) VALUES($1,$2,$3,$4) RETURNING *',
        [name, category_id, price, stock]
    );
    res.json(result.rows[0]);
});

module.exports = router;
