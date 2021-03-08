var router = require('express').Router();
const User = require('../../../model/User.js');

// Test Get
router.get('/test', (req, res) => {
	res.json({
		success: true,
		message: 'Hello world'
	});
});

router.post('/findByPk', async (req, res) => {
	const user = await User.findByPk(req.body.idUser);

	res.json({
		success: true,
		result: user
	});
});

router.post('/findByWhere', async (req, res) => {
	const where = req.body;
	const result = await User.findAll({ where: where });

	res.json({
		success: true,
		result: result
	});
});

router.post('/create', async (req, res) => {
	const user = req.body;
	const result = await User.create({
		nmUser: user.nmUser,
		dsLogin: user.dsLogin,
		dsPassword: user.dsPassword,
		dsEmail: user.dsEmail,
		dsAvatar: user.dsAvatar
	});

	res.json({
		success: true,
		result: result
	});
});

router.get('/findAll', async (req, res) => {
	const users = await User.findAll();

	res.json({
		success: true,
		result: users
	});
});

router.post('/update', async (req, res) => {
	const userUpdated = req.body;
	const userOld = await User.findByPk(userUpdated.idUser);

	userOld.nmUser = userUpdated.nmUser;
	userOld.dsLogin = userUpdated.dsLogin;
	userOld.dsPassoword = userUpdated.dsPassoword;
	userOld.dsEmail = userUpdated.dsEmail;
	userOld.dsAvatar = userUpdated.dsAvatar;

	const result = await userOld.save();

	res.json({
		success: true,
		result: result
	});
});

router.post('/delete', async (req, res) => {
	const user = req.body;

	const result = await User.destroy({ where: { idUser: user.idUser } });;

	res.json({
		success: true,
		result: result
	});
});

module.exports = router;