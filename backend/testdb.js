/**
 * Importa mysql2 con soporte de promesas para usar async/await.
 */
const mysql = require('mysql2/promise');

/**
 * Script simple para probar la conexión a MySQL y ejecutar una consulta básica.
 */
async function test() {
  try {
    // Crea un pool local para la prueba de conexión
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'snshop',
    });

    // Ejecuta una consulta de prueba
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');

    // Muestra el resultado esperado (2)
    console.log('Resultado:', rows[0].solution); // Debe imprimir 2
  } catch (err) {
    // Muestra errores de conexión o consulta
    console.error('Error al conectar a MySQL:', err);
  }
}

// Ejecuta la prueba
test();
