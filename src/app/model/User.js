const Sequelize = require('sequelize');
const database = require('../config/db');

const User = database.define('user', {
    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: "id_user"
    },
    nmUser: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "nm_user"
    },
    dsLogin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: "ds_login"
    },
    dsPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_password"
    },
    dsEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        field: "ds_email"
    },
    dsAvatar: {
        type: Sequelize.STRING,
        field: "ds_avatar"
    }
})

module.exports = User;