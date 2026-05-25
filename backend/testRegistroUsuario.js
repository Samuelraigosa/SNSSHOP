const db = require('./db');

async function testRegistro() {
  const email = `test_${Date.now()}@snshop.com`;

  try {
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      ['Usuario Test Directo', email, '123456']
    );

    console.log('Insert OK. ID:', resultado.insertId);

    const [rows] = await db.query(
      'SELECT id, nombre, email FROM usuarios WHERE id = ?',
      [resultado.insertId]
    );

    console.log('Usuario guardado:', rows[0]);
  } catch (error) {
    console.error('Error insertando usuario:', error);
  } finally {
    process.exit(0);
  }
}

testRegistro();
