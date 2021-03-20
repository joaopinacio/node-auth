var router = require('express').Router();
const middlewareFunctions = require('../middleware/Middleware.js');
const User = require('../../../model/User.js');
const UsersController = require('../../../controller/User.js');
const UserController = new UsersController(User);
require('express-group-routes');

router.group((router) => {
    // * authorize()
    router.use(middlewareFunctions.auth);

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
        res.clearCookie('SessionCookie');
        req.session.destroy;
        res.redirect('/');
    });

    router.post('/findByPk', middlewareFunctions.validateParams([
        {
            paramKey: 'idUser',
            required: true,
            type: 'number',
        },
    ]), async (req, res) => {
        await UserController.getById(req.body.idUser).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/findByWhere', async (req, res) => {
        const where = req.body;
        await UserController.getByWhere(where).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.get('/findAll', async (req, res) => {
        await UserController.getAll().then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/create', middlewareFunctions.validateParams([
        {
            paramKey: 'nmUser',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsLogin',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsPassword',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsEmail',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsAvatar',
            required: false,
            type: 'string',
        }
    ]), async (req, res) => {
        await UserController.create(req.body).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        });
    });

    router.post('/update', middlewareFunctions.validateParams([
        {
            paramKey: 'idUser',
            required: true,
            type: 'number',
        },
        {
            paramKey: 'nmUser',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsLogin',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsEmail',
            required: true,
            type: 'string',
        },
        {
            paramKey: 'dsAvatar',
            required: false,
            type: 'string',
        }
    ]), async (req, res) => {
        await UserController.update(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });

    router.post('/delete', middlewareFunctions.validateParams([
        {
            paramKey: 'idUser',
            required: true,
            type: 'number',
        },
    ]), async (req, res) => {
        await UserController.delete(req.body).then(response => {
            res.status(response.statusCode);
            res.json(response.data);
        });
    });
});

module.exports = router;