const Sequelize = require('sequelize');
const sequelizeConnect = new Sequelize('node-auth', 'root', 'root', {dialect: 'mysql', host: 'mysql-auth'});

module.exports = {sequelizeConnect, Sequelize};