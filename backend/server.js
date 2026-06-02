/**
 * Importa Express para crear el servidor HTTP y definir rutas.
 */
const express = require('express');

/**
 * Importa CORS para permitir solicitudes desde el frontend
 * (por ejemplo, cuando frontend y backend están en puertos distintos).
 */
const cors = require('cors');

/**
 * Importa los routers de productos y usuarios.
 * Cada router contiene endpoints agrupados por funcionalidad.
 */
const productosRouter = require('./productosRoute');
const usuariosRouter = require('./usuariosRoute');

/**
 * Crea la aplicación principal de Express.
 */
const app = express();

/**
 * Middleware global:
 * - cors(): habilita CORS.
 * - express.json(): permite leer JSON en req.body.
 */
app.use(cors());
app.use(express.json());

/**
 * Monta ambos routers bajo el prefijo /api.
 * Ejemplos:
 * - /api/productos
 * - /api/usuarios/registro
 * - /api/usuarios/login
 */
app.use('/api', productosRouter);
app.use('/api', usuariosRouter);

/**
 * Inicia el servidor en el puerto 3000.
 */
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
