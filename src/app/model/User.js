const {sequelizeConnect, Sequelize} = require('../config/db');
const bcrypt = require('bcrypt');

const User = sequelizeConnect.define('user', {
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
}, {
    hooks: {
        beforeCreate: async function(user) {
            // * Funcao hash para encriptar senha (By @Gabjoa, @ferkarchiloff, @bashrc_ronald)
            const salt = bcrypt.genSaltSync();
            const hashedPassword = await bcrypt.hashSync(user.dsPassword, salt);
            user.dsPassword = hashedPassword;
        }
    }
});

User.prototype.validPassword = async function (password) {
    const checkPass = await bcrypt.compareSync(password, this.dsPassword);
    return checkPass;
}

module.exports = User;