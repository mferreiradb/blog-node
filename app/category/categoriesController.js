const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const slugify = require('slugify');
const Admin = require('../middlewares/adminAuth');

router.get('/admin/categories', Admin, (req, res) => {
	Category.findAll().then((categories) => {
		res.render('admin/categories/index', { categories: categories });
	});
});

router.get('/admin/categories/new', Admin, (req, res) => {
	res.render('admin/categories/new');
});

router.post('/categorires/save', Admin, (req, res) => {
	const title = req.body.title.toUpperCase();

	if (title.length > 0) {
		console.log(`Dado: ${title}\ntamanho: ${title.length}`);
		Category.create({
			title: title,
			slug: slugify(title)
		}).then(() => {
			res.redirect('/admin/categories');
		});
	} else {
		res.redirect('/admin/categories/new');
		console.log('Conteúdo inválido');
	}
});

router.post('/admin/categories/delete', Admin, (req, res) => {
	var id = req.body.id;

	if (id.length > 0) {
		if (!isNaN(id)) {
			Category.destroy({
				where: {
					id: id
				}
			}).then(() => {
				res.redirect('/admin/categories');
			});
		} else {
			res.redirect('/admin/categories');
		}
	} else {
		res.redirect('/admin/categories');
	}
});

router.get('/admin/categories/edit/:id', Admin, (req, res) => {
	let id = req.params.id;

	if (isNaN(id)){
		res.redirect('/admin/categories');
	}
	Category.findByPk(id).then((category) => {
		if (category != undefined) {
			res.render('admin/categories/edit', {category: category});
		} else {
			res.redirect('/admin/categories');
		}
	}).catch((err) => {
		console.log(err);
		res.redirect('/admin/categories');
	});
});

router.post('/admin/categories/update', Admin, (req, res) => {
	let id = req.body.id;
	let title = req.body.title.toUpperCase();

	Category.update({title: title, slug: slugify(title)}, {
		where: {
			id: id
		}
	}).then(() => {
		res.redirect('/admin/categories');
	}).catch((err) => {
		console.log(err);
	});
});

module.exports = router;