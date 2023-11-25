const jwt = require('jsonwebtoken');
const Usuarios = require('../models/usuariosModel');

const AuthController = {
  async login(req, res) {
    try {
      const { email, contraseña } = req.body;

      const { userData, tipoUsuario, token } = await Usuarios.autenticarUsuario(email, contraseña);

      // Aquí podrías devolver los datos del usuario y el token en la respuesta
      res.status(200).json({ userData, tipoUsuario, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  async logout(req, res) {
    const token = req.headers.authorization.split(' ')[1]; // Suponiendo que el token JWT está en el encabezado Authorization

    try {
      // Decodificar el token para obtener la información del usuario
      const decodedToken = jwt.verify(token, 'tu_secreto_secreto');
      const userId = decodedToken.id; // El ID del usuario obtenido del token

      // Aquí podrías realizar más lógica de cierre de sesión si es necesario

      // Envías una respuesta exitosa al cliente
      res.status(200).json({ message: 'Sesión cerrada con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  }

};

module.exports = AuthController;
