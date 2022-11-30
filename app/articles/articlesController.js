const express = require('express');
const router = express.Router();
const Category = require ('../models/Category');
const Article = require ('../models/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
	res.send('Rota de artigos');
});

router.get('/admin/articles/new', (req, res) => {
	Category.findAll().then((categories) => {
		res.render('admin/articles/new', {categories: categories});
	});
});

router.post('/admin/articles/save', (req, res) => {
	let title = req.body.title.toUpperCase();
	let body = req.body.body;
	let categoryID  = req.body.category;

	Article.create({
		title: title,
		slug: slugify(title),
		body: body,
		categoryId: categoryID
	}).then(() => {
		res.redirect('/admin/articles');
	});
});

module.exports = router;