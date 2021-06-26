const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const UserModel = require('../app/models/UserModel');
const PlanModel = require('../app/models/PlanModel');

const connection = new Sequelize(databaseConfig);

connection
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Nao foi possível se conectar ao banco: ', err);
  });

  UserModel.init(connection);
  PlanModel.init(connection);

module.exports = connection;
