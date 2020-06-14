
// Configuración logs en consola
require('console-stamp')(console, {
  pattern: 'dd/mm/yyyy HH:MM:ss.l'
});

// Configuración y establecimiento de variables de entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || '3000';
console.info(`Estableciendo las variables en el entorno: '${process.env.NODE_ENV}'`);
require('dotenv').config({
  path: `${__dirname}/../../environments/.env.${process.env.NODE_ENV}`
});

// Conexión con bd e inicializacion de modelos
require('./../models/index');