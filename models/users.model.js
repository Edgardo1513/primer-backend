//Import DataTypes de sequelize
const { DataTypes } = require('sequelize');

//Import la instancia db creada
const db = require('../utils/database');

//creacion de model Users por convencion se acostumbra a los que los modelos esten en mayusculas
const Users = db.define('users', {
    // por defecto sequelize crea el id como pk y autoincrementable
    id:{ 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30), 
      defaultValue: 'Jhon',       
    },
    lastname: {
      type: DataTypes.STRING(30),
      defaultValue: 'Doe', 
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      valide: {
        isEmail: true,
        }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
});

//exportacion del modelo Users;
module.exports = Users;
