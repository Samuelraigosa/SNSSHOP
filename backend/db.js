/**
 * Importa la versión con promesas de mysql2 para poder usar async/await
 * al momento de ejecutar consultas.
 */
const mysql = require('mysql2/promise');

/**
 * Crea un pool de conexiones a MySQL.
 * El pool permite reutilizar conexiones y mejora el rendimiento.
 */
const pool = mysql.createPool({
  // Host donde está corriendo MySQL
  host: 'localhost',
  // Usuario de la base de datos
  user: 'root',       // Cambia si tienes otro usuario
  // Contraseña del usuario
  password: '',       // Cambia si configuraste contraseña
  // Nombre de la base de datos a usar
  database: 'snshop',
  // Espera conexiones disponibles cuando el límite se alcanza
  waitForConnections: true,
  // Número máximo de conexiones simultáneas en el pool
  connectionLimit: 10,
  // 0 = cola ilimitada para solicitudes de conexión
  queueLimit: 0
});

/**
 * Exporta el pool para reutilizarlo en rutas y scripts.
 */
module.exports = pool;
