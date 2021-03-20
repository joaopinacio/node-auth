var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const User = require('../../../model/User.js');
require('express-group-routes');

router.group((router) => {
    // * sessionChecker()
    router.use(middlewareFunctions.sessChecker);

    router.post('/login', middlewareFunctions.validateParams([
        {
            paramKey: 'dsLogin',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsPassword',
            required: true,
            type: 'string',
        }
    ]), async (req, res) => {
        const userLogin = req.body;
        let resultMessage = {};

        const user = await User.findOne({ where: { dsLogin: userLogin.dsLogin } });

        if(user){
            try {
                if(await user.validPassword(userLogin.dsPassword)){
                    req.session.user = user.dataValues;
                    return res.redirect('/home');
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

module.exports = router;