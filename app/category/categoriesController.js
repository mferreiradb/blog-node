const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const slugify = require('slugify');

router.get('/admin/categories/new', (req, res) => {
	res.render('admin/categories/new');
});

router.post('/categorires/save', (req, res) => {
	const title = req.body.title.toUpperCase();

	if (title.length > 0) {
		console.log(`Dado: ${title}\ntamanho: ${title.length}`);
		Category.create({
			title: title,
			slug: slugify(title)
		}).then(() => {
			res.redirect('/');
		});
	} else {
		res.redirect('/admin/categories/new');
		console.log('Conteúdo inválido');
	}
});

router.get('/admin/categories', (req, res) => {

	Category.findAll().then((categories) => {
		res.render('admin/categories/index', {categories: categories});
	});
});

module.exports = router;