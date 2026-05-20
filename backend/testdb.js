const mysql = require('mysql2/promise');

async function test() {
  try {
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'snshop',
    });

    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('Resultado:', rows[0].solution); // Debe imprimir 2
  } catch (err) {
    console.error('Error al conectar a MySQL:', err);
  }
}

test();