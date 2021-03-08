var router = require('express').Router();
const User = require('../../../model/User.js');
const bcrypt = require('bcrypt');

var salt = 10;

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

    try {
        const hashedPassword = await bcrypt.hash(user.dsPassword, salt);
        user.dsPassword = hashedPassword;
    } catch (error) {
        res.json({
            status: true,
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
        res.json({
            status: true,
            result: item
        });
    }).catch(function (err) {
        res.json({
            status: false,
            result: err
        });
    });
});

router.get('/findAll', async (req, res) => {
	const users = await User.findAll();

	res.json({
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

	res.json({
		status: true,
		result: result
	});
});

router.post('/delete', async (req, res) => {
	const user = req.body;

	const result = await User.destroy({ where: { idUser: user.idUser } });;

	res.json({
		status: true,
		result: result
	});
});

module.exports = router;