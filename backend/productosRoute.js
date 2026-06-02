/**
 * Importa Express para crear rutas del módulo de productos.
 */
const express = require('express');

/**
 * Crea una instancia de Router para agrupar endpoints relacionados.
 */
const router = express.Router();

/**
 * Importa la conexión (pool) a la base de datos.
 */
const db = require('./db');

/**
 * GET /api/productos
 * Obtiene la lista de productos junto con el nombre de su categoría.
 */
router.get('/productos', async (req, res) => {
  try {
    /**
     * Consulta SQL:
     * - Trae todas las columnas de productos (productos.*)
     * - Agrega el nombre de categoría como categoria_nombre
     * - Usa LEFT JOIN para incluir productos aunque no tengan categoría asociada
     */
    const [rows] = await db.query(`
      SELECT productos.*, categorias.nombre AS categoria_nombre
      FROM productos
      LEFT JOIN categorias ON productos.categoria_id = categorias.id
    `);

    // Responde con el arreglo de productos en formato JSON
    res.json(rows);
  } catch (error) {
    // Muestra el detalle del error en consola para depuración
    console.error('ERROR en /api/productos:', error);

    // Respuesta estándar de error del servidor
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

/**
 * Exporta el router para montarlo en server.js.
 */
module.exports = router;
