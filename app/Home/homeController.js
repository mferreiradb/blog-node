const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Category = require('../models/Category');

router.get('/', (req, res) => {
	Article.findAll({
		order: [['id', 'desc']],
		raw: true,
		limit: 4,
		include: [{model: Category}]
	}).then((articles) => {
		Category.findAll({}).then((categories) => {
			res.render('index', {articles: articles, categories: categories});
		});
	});
});

router.get('/article/:slug', (req, res) => {
	let slug = req.params.slug;
	Article.findOne({
		where: {
			slug: slug
		}
	}).then((article) => {
		if (article != undefined) {
			Category.findAll().then((categories) => {
				res.render('article', {article: article, categories: categories});
			});
		} else {
			res.redirect('/');
		}
	}).catch((err) => {
		res.redirect('/');
		console.log(err);
	});
});

router.get('/category/:slug', (req, res) => {
	let slug = req.params.slug;
	Category.findOne({
		where: {
			slug: slug
		},
		include: [{model: Article}]
	}).then((category) => {
		if (category != undefined) {
			
			Category.findAll().then((categories) => {
				res.render('index', {articles: category.articles, categories: categories});	
			});
		} else {
			res.redirect('/');
		}
	}).catch((err) => {
		res.redirect('/');
		console.log(err);
	});
});

router.get('/session', (req, res) => {
	req.session.treinamento = 'Node';
	req.session.ano = '2022';
	req.session.email = 'teste@teste.com';
	req.session.user = {
		username: 'mau',
		email: 'mau@teste.com',
		id: 12
	};
	res.send('Sessão gerada');
});

router.get('/read', (req, res) => {
	req.session.treinamento;
	res.json(req.session.user);
});

module.exports = router;