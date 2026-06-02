/**
 * Importa el pool de conexión compartido para ejecutar consultas.
 */
const db = require('./db');

/**
 * Script de prueba para insertar un usuario directamente en la base de datos
 * y luego consultar el registro insertado.
 */
async function testRegistro() {
  // Genera un correo único usando timestamp para evitar duplicados
  const email = `test_${Date.now()}@snshop.com`;

  try {
    // Inserta un usuario de prueba
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      ['Usuario Test Directo', email, '123456']
    );

    // Muestra el ID generado por la inserción
    console.log('Insert OK. ID:', resultado.insertId);

    // Consulta el usuario recién insertado por su ID
    const [rows] = await db.query(
      'SELECT id, nombre, email FROM usuarios WHERE id = ?',
      [resultado.insertId]
    );

    // Muestra en consola el usuario guardado
    console.log('Usuario guardado:', rows[0]);
  } catch (error) {
    // Muestra errores de inserción o consulta
    console.error('Error insertando usuario:', error);
  } finally {
    // Finaliza el proceso al completar la prueba
    process.exit(0);
  }
}

// Ejecuta la prueba de registro
testRegistro();
