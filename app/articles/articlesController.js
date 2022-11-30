const express = require('express');
const router = express.Router();
const Category = require ('../models/Category');
const Article = require ('../models/Article');
const slugify = require('slugify');

router.get('/articles', (req, res) => {
	Category.findAll().then((categories) => {
		res.render('admin/articles/index', {categories: categories});
	});
});

router.get('/articles/new', (req, res) => {
	Category.findAll().then((categories) => {
		res.render('admin/articles/new', {categories: categories});
	});
});

router.post('/articles/save', (req, res) => {
	let title = req.body.title.toUpperCase();
	let body = req.body.body;
	let categoryID  = req.body.category;
	
	Article.create({
		title: title,
		slug: slugify(title),
		body: body,
		categoryID: categoryID
	}).then(() => {
		res.redirect();
	});
});

module.exports = router;