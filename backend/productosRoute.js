const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/productos', async (req, res) => {
  try {
    // Consulta simple con JOIN para traer categoría_nombre
    const [rows] = await db.query(`
      SELECT productos.*, categorias.nombre AS categoria_nombre
      FROM productos
      LEFT JOIN categorias ON productos.categoria_id = categorias.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('ERROR en /api/productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

module.exports = router;