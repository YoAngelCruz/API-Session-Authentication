const { Pool } = require('pg');

// Configura la conexión a la base de datos
const pool = new Pool({
  user: "postgres", // Nombre de usuario de PostgreSQL
  host: "localhost", // Host de PostgreSQL (por lo general, 'localhost')
  database: "dbicec2", // Nombre de la base de datos
  password: "admin", // Contraseña de PostgreSQL
  port: 5432, // Puerto de PostgreSQL (por lo general, 5432)
});

module.exports = pool;
