const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar las rutas de cada controlador
const usuariosRoutes = require('./Api/routes/usuariosRoutes')

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Configuración de las rutas
app.use('/api', usuariosRoutes); // Rutas de usuarios

// Puerto donde escuchará el servidor
const PORT = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("**Bienvenido al API-Session-Authentication de ICEC-WEB**");
});
