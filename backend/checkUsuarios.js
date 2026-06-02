/**
 * Importa el pool de conexión para ejecutar consultas en MySQL.
 */
const db = require('./db');

/**
 * Script de verificación:
 * 1) Comprueba si existe la tabla 'usuarios'
 * 2) Si existe, muestra los últimos 5 registros
 */
async function run() {
  try {
    // Verifica la existencia de la tabla usuarios
    const [tables] = await db.query("SHOW TABLES LIKE 'usuarios'");
    console.log('Tabla usuarios:', tables);

    // Si la tabla existe, consulta los últimos usuarios creados
    if (tables.length > 0) {
      const [rows] = await db.query('SELECT id, nombre, email FROM usuarios ORDER BY id DESC LIMIT 5');
      console.log('Últimos usuarios:', rows);
    }
  } catch (error) {
    // Muestra error en consola si la consulta falla
    console.error('Error:', error);
  } finally {
    // Finaliza el proceso al terminar (éxito o error)
    process.exit(0);
  }
}

// Ejecuta la función principal del script
run();
