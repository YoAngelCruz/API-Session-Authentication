const AuthController = require('../controllers/usuariosController');
const express = require('express');
const verificarTipoUsuario = require('../middleware/autorizacionMiddleware');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', AuthController.login);

// Ruta para cerrar sesión
router.post('/logout', AuthController.logout);

// Ruta protegida para los administradores
router.get('/admin', verificarTipoUsuario, (req, res) => {
  // Acción para los administradores
  
});

// Ruta protegida para los profesores
router.get('/profesor', verificarTipoUsuario, (req, res) => {
  // Acción para los profesores
});

// Ruta protegida para los alumnos
router.get('/alumno', verificarTipoUsuario, (req, res) => {
  // Acción para los alumnos
});

module.exports = router;
