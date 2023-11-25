const jwt = require('jsonwebtoken');

const verificarTipoUsuario = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, 'tu_secreto_secreto');
    req.userData = decodedToken; // Guardar la información del usuario en el objeto de solicitud para usarlo posteriormente

    // Verificar el tipo de usuario obtenido del token
    if (decodedToken.tipoUsuario === 'administrador') {
      // Si es administrador, permitir el acceso a las rutas de administrador
      next();
    } else if (decodedToken.tipoUsuario === 'profesor') {
      // Si es profesor, permitir el acceso a las rutas de profesor
      next();
    } else if (decodedToken.tipoUsuario === 'alumno') {
      // Si es alumno, permitir el acceso a las rutas de alumno
      next();
    } else {
      // Tipo de usuario no reconocido
      return res.status(403).json({ error: 'Acceso prohibido. Tipo de usuario no válido.' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
  }
};

module.exports = verificarTipoUsuario;
