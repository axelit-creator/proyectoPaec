const path = require('path');

// Carga el archivo .env desde la ubicación correcta
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const mysql = require('mysql2/promise');

// Verifica que todas las variables de entorno necesarias estén definidas
const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Falta la variable de entorno requerida: ${key}`);
  }
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
