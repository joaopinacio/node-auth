const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-auth', 'root', 'root', {dialect: 'mysql', host: 'mysql-auth'});

module.exports = sequelize;