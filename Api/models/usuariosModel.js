const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuarios = {
  async autenticarUsuario(email, contraseña) {
    try {
      let tipoUsuario = null;
      let userData = null;

      // Verificar si el usuario es un administrador
      const adminQuery = 'SELECT * FROM administradores WHERE email = $1';
      const adminValues = [email];
      const adminData = await pool.query(adminQuery, adminValues);

      if (adminData.rows.length > 0) {
        userData = adminData.rows[0];
        tipoUsuario = 'administrador';
      } else {
        // Verificar si el usuario es un profesor
        const profesorQuery = 'SELECT * FROM profesores WHERE email = $1';
        const profesorValues = [email];
        const profesorData = await pool.query(profesorQuery, profesorValues);

        if (profesorData.rows.length > 0) {
          userData = profesorData.rows[0];
          tipoUsuario = 'profesor';
        } else {
          // Verificar si el usuario es un alumno
          const alumnoQuery = 'SELECT * FROM alumnos WHERE email = $1';
          const alumnoValues = [email];
          const alumnoData = await pool.query(alumnoQuery, alumnoValues);

          if (alumnoData.rows.length > 0) {
            userData = alumnoData.rows[0];
            tipoUsuario = 'alumno';
          } else {
            throw new Error('Usuario no encontrado');
          }
        }
      }

      const passwordMatch = await bcrypt.compare(contraseña, userData.contraseña);
      if (!passwordMatch) {
        throw new Error('La contraseña no es válida');
      }

      // Generar token JWT
      const token = jwt.sign({ id: userData.id, email: userData.email, tipoUsuario }, 'tu_secreto_secreto', {
        expiresIn: '5h' // Tiempo de expiración del token
      });

      return { userData, tipoUsuario, token }; // Devolver solo el ID del usuario
    } catch (error) {
      throw error;
    }
  },

};

module.exports = Usuarios;