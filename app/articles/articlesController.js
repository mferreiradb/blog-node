const express = require('express');
const router = express.Router();
const Category = require ('../models/Category');
const Article = require ('../models/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
	Article.findAll({
		include: [{model: Category}]
	}).then((articles) => {
		res.render('admin/articles/index', {articles: articles});
	});
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

router.post('/articles/delete', (req, res) => {
	var id = req.body.id;

	if (id.length > 0) {
		if (!isNaN(id)) {
			Article.destroy({
				where: {
					id: id
				}
			}).then(() => {
				res.redirect('/admin/articles');
			});
		} else {
			res.redirect('/admin/articles');
		}
	} else {
		res.redirect('/admin/articles');
	}
});

module.exports = router;