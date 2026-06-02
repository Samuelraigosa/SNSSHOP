/**
 * Importa Express para definir rutas relacionadas con usuarios.
 */
const express = require('express');

/**
 * Crea el router de este módulo.
 */
const router = express.Router();

/**
 * Importa la conexión a base de datos (pool de MySQL).
 */
const db = require('./db');

/**
 * POST /api/usuarios/registro
 * Registra un nuevo usuario en la base de datos.
 */
router.post('/usuarios/registro', async (req, res) => {
  try {
    // Extrae campos del cuerpo de la petición
    const { nombre, email, password, confirmar } = req.body;

    // Valida que todos los campos requeridos estén presentes
    if (!nombre || !email || !password || !confirmar) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Valida que la contraseña y su confirmación coincidan
    if (password !== confirmar) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    // Verifica si ya existe un usuario con el mismo correo
    const [existe] = await db.query(
      'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );

    // Si existe, responde conflicto (correo duplicado)
    if (existe.length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    // Inserta el nuevo usuario
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, password]
    );

    // Responde éxito con el id generado
    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuarioId: resultado.insertId
    });
  } catch (error) {
    // Log de error para depuración
    console.error('ERROR en /api/usuarios/registro:', error);

    // Respuesta genérica de error interno
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

/**
 * POST /api/usuarios/login
 * Inicia sesión validando correo y contraseña.
 */
router.post('/usuarios/login', async (req, res) => {
  try {
    // Extrae credenciales desde el cuerpo de la petición
    const { email, password } = req.body;

    // Valida que ambos campos existan
    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    // Busca usuario por correo
    const [usuarios] = await db.query(
      'SELECT id, nombre, email, password FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );

    // Si no existe el correo, responde not found
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Correo no registrado' });
    }

    // Toma el primer usuario encontrado
    const usuario = usuarios[0];

    // Compara contraseña enviada con la almacenada
    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Responde login exitoso con datos básicos del usuario
    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    // Log de error para depuración
    console.error('ERROR en /api/usuarios/login:', error);

    // Respuesta genérica de error interno
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

/**
 * Exporta el router para usarlo en server.js.
 */
module.exports = router;
