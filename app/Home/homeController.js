const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Category = require('../models/Category');

router.get('/', (req, res) => {
	Article.findAll({
		order: [['id', 'desc']],
		raw: true,
		include: [{model: Category}]
	}).then((articles) => {
		Category.findAll({}).then((categories) => {
			res.render('index', {articles: articles, categories: categories});
		});
	});
});

router.get('/:slug', (req, res) => {
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

module.exports = router;