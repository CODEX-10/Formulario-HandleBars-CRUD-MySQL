const Sequelize = require('sequelize');

// CONFIG. DE ACESSO AO BANCO DE DADOS:
const sequelize = new Sequelize('db_post','root','macaco007',{
    host: 'localhost',
    dialect:'mysql'
});

// EXPORTANDO AS VARIÁVEIS
module.exports = {Sequelize, sequelize};

