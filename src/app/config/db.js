const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql', 'root', 'root', {dialect: 'mysql', host: 'mysql'});

module.exports = sequelize;