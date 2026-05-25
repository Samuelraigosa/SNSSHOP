const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/usuarios/registro', async (req, res) => {
  try {
    const { nombre, email, password, confirmar } = req.body;

    if (!nombre || !email || !password || !confirmar) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (password !== confirmar) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const [existe] = await db.query(
      'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );

    if (existe.length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    const [resultado] = await db.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, password]
    );

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuarioId: resultado.insertId
    });
  } catch (error) {
    console.error('ERROR en /api/usuarios/registro:', error);
    return res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/usuarios/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    const [usuarios] = await db.query(
      'SELECT id, nombre, email, password FROM usuarios WHERE email = ? LIMIT 1',
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Correo no registrado' });
    }

    const usuario = usuarios[0];

    if (usuario.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('ERROR en /api/usuarios/login:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
