var router = require('express').Router();
const {authorize} = require('../middleware/Middleware.js');
const User = require('../../../model/User.js');
const bcrypt = require('bcrypt');
require('express-group-routes');

const salt = 10;

// TODO: Lembrar de tratar body diferenciados (By @Hugo_Mesquita)

router.post('/login', async (req, res) => {
    const userLogin = req.body;
    let resultMessage = {};

    const user = await User.findOne({ where: { dsLogin: userLogin.dsLogin } });

    if(user){
        try {
            const resultPass = await bcrypt.compare(userLogin.dsPassword, user.dsPassword);

            if(resultPass){
                resultMessage = {
                    status: true,
                    result: user
                };
            }else{
                resultMessage = {
                    status: false,
                    result: "Senha Inválida"
                };
            }
        } catch (error) {
            resultMessage = {
                status: false,
                result: error
            };
        }
    }else{
        resultMessage = {
            status: false,
            result: "Login inválido"
        }
    }

    return res.json(resultMessage);
});

router.group((router) => {
    router.use(authorize);

    // Test Get
    router.get('/test', (req, res) => {
        res.json({
            status: true,
            message: 'Hello world'
        });
    });

    router.post('/findByPk', async (req, res) => {
        const user = await User.findByPk(req.body.idUser);

        res.json({
            status: true,
            result: user
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        const result = await User.findAll({ where: where });

        res.json({
            status: true,
            result: result
        });
    });

    router.post('/create', async (req, res) => {
        const user = req.body;

        // * Funcao hash para encriptar senha (By @Gabjoa, @ferkarchiloff, @bashrc_ronald)
        try {
            const hashedPassword = await bcrypt.hash(user.dsPassword, salt);
            user.dsPassword = hashedPassword;
        } catch (error) {
            return res.json({
                status: false,
                result: error
            });
        }

        User.create({
            nmUser: user.nmUser,
            dsLogin: user.dsLogin,
            dsPassword: user.dsPassword,
            dsEmail: user.dsEmail,
            dsAvatar: user.dsAvatar
        }).then(function(item){
            return res.json({
                status: true,
                result: item
            });
        }).catch(function (err) {
            return res.json({
                status: false,
                result: err
            });
        });
    });

    router.get('/findAll', async (req, res) => {
        const users = await User.findAll();

        return res.json({
            status: true,
            result: users
        });
    });

    router.post('/update', async (req, res) => {
        const userUpdated = req.body;
        const userOld = await User.findByPk(userUpdated.idUser);

        userOld.nmUser = userUpdated.nmUser;
        userOld.dsLogin = userUpdated.dsLogin;
        userOld.dsPassword = userUpdated.dsPassword;
        userOld.dsEmail = userUpdated.dsEmail;
        userOld.dsAvatar = userUpdated.dsAvatar;

        const result = await userOld.save();

        return res.json({
            status: true,
            result: result
        });
    });

    router.post('/delete', async (req, res) => {
        const user = req.body;

        const result = await User.destroy({ where: { idUser: user.idUser } });;

        return res.json({
            status: true,
            result: result
        });
    });
});

module.exports = router;