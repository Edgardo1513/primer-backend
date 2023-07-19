//archivo de configuracion
//Importar sequelize
const {  Sequelize } = require('sequelize');
require('dotenv').config();

// crear una instancia de conexion a la base de dato.
const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: "postgres",
    dialectOptions: {ssl: { require: true, rejectUnauthorized: false }}
});

//exportar la instancia creada
//export desfault db; or module.export = db;
module.exports = db;
