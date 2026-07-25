const express = require('express');
const db = require('../db/connection');

const router = express.Router();

router.get('/', (req, res) => {
  const products = db
    .prepare('SELECT * FROM products ORDER BY id ASC')
    .all()
    .map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      imageUrl: p.image_url,
      inStock: !!p.in_stock,
    }));
  res.json(products);
});

module.exports = router;
