const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const connection = new Sequelize(databaseConfig);

connection
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Nao foi possível se conectar ao banco: ', err);
  });

module.exports = connection;
