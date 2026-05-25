const db = require('./db');

async function run() {
  try {
    const [tables] = await db.query("SHOW TABLES LIKE 'usuarios'");
    console.log('Tabla usuarios:', tables);

    if (tables.length > 0) {
      const [rows] = await db.query('SELECT id, nombre, email FROM usuarios ORDER BY id DESC LIMIT 5');
      console.log('Últimos usuarios:', rows);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

run();
