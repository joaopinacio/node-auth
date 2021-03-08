var router = require('express').Router();
const Product = require('../../../model/Product.js');

// Test Get
router.get('/test', (req, res) => {
	res.json({
		success: true,
		message: 'Hello world'
	});
});

router.post('/findByPk', async (req, res) => {
	const product = await Product.findByPk(req.body.id);

	res.json({
		success: true,
		result: product
	});
});

router.post('/findByWhere', async (req, res) => {
	const where = req.body;
	const result = await Product.findAll({ where: where });

	res.json({
		success: true,
		result: result
	});
});

router.post('/create', async (req, res) => {
	const product = req.body;
	const result = await Product.create({
		nome: product.nome,
		preco: product.preco,
		descricao: product.descricao
	});

	res.json({
		success: true,
		result: result
	});
});

router.get('/findAll', async (req, res) => {
	const products = await Product.findAll();

	res.json({
		success: true,
		result: products
	});
});

router.post('/update', async (req, res) => {
	const productUpdated = req.body;
	const productOld = await Product.findByPk(productUpdated.id);

	productOld.nome = productUpdated.nome;
	productOld.preco = productUpdated.preco;
	productOld.descricao = productUpdated.descricao;

	const result = await productOld.save();

	res.json({
		success: true,
		result: result
	});
});

router.post('/delete', async (req, res) => {
	const product = req.body;

	const result = await Product.destroy({ where: { id: product.id } });;

	res.json({
		success: true,
		result: result
	});
});

module.exports = router;