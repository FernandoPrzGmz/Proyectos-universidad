import path from 'path';
import fs from 'fs';
import { Sequelize } from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db.connection.config')[env];
const db: any = {};

let sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, config);
const modelsFiles = fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === 'model.js'));

// Inicializando modelos
modelsFiles.forEach(file => {
  console.log(`Inicializando modelo: ${ file.slice(0,-9) }`);
  require( path.join(__dirname, file) ).default.init(sequelize);
});
// Asociando modelos
modelsFiles.forEach(file => {
  console.log(`Asociando modelo: ${ file.slice(0,-9) }`);
  require( path.join(__dirname, file) ).default.associate();
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
