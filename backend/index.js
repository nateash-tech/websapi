require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Postgres Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 1. Get Categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Products (with Filter & Search)
app.get('/api/products', async (req, res) => {
  try {
    const { category, farm, search } = req.query;
    let query = `
      SELECT p.*, c.name as category_name, f.name as farm_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN farms f ON p.farm_id = f.id
      WHERE p.is_active = true
    `;
    const params = [];

    if (category && category !== 'Semua Kategori') {
      params.push(category);
      query += ` AND c.name = $${params.length}`;
    }
    if (farm && farm !== 'Semua Kandang') {
      params.push(farm);
      query += ` AND f.name = $${params.length}`;
    }
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (p.name ILIKE $${params.length} OR p.kode_unik ILIKE $${params.length})`;
    }

    query += ' ORDER BY p.created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Get Single Product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT p.*, c.name as category_name, f.name as farm_name, f.location as farm_location
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN farms f ON p.farm_id = f.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Farms
app.get('/api/farms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM farms ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('IndopalmSapi API (Postgres) is running...');
});

// Pool error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Export for Vercel
module.exports = app;

// Listen if running locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
