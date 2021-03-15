var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const User = require('../../../model/User.js');
require('express-group-routes');

// TODO: Lembrar de tratar body diferenciados (By @Hugo_Mesquita)
router.group("/auth", (router) => {
    // * sessionChecker()
    router.use(middlewareFunctions[1]);

    router.post('/login', async (req, res) => {
        const userLogin = req.body;
        let resultMessage = {};

        const user = await User.findOne({ where: { dsLogin: userLogin.dsLogin } });

        if(user){
            try {
                if(user.validPassword(userLogin.dsPassword)){
                    resultMessage = {
                        status: true,
                        result: user
                    };

                    req.session.user = user.dataValues;
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
});

router.group((router) => {
    // * authorize()
    router.use(middlewareFunctions[0]);

    // Test Get
    router.get('/test', (req, res) => {
        res.json({
            status: true,
            message: 'Hello world',
            userLogged: req.session.user
        });
    });

    // * req.session.destroy (By @gabigolcorinthiano)
    router.get('/logout', async (req, res) => {
        if (req.session.user && req.cookies.SessionCookie) {
            res.clearCookie('SessionCookie');
            req.session.destroy;
            res.redirect('/');
        } else {
            res.redirect('/loginPage');
        }
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