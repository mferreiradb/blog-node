const express = require('express');
const router = express.Router();
const Category = require ('../models/Category');
const Article = require ('../models/Article');
const slugify = require('slugify');

router.get('/admin/articles', (req, res) => {
	Article.findAll({
		order: [['id','desc']],
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

router.get('/admin/articles/edit/:id', (req, res) => {
	let id = req.params.id;

	if (isNaN(id)){
		res.redirect('/admin/articles');
	}
	Article.findByPk(id).then((article) => {
		if (article != undefined) {

			Category.findAll().then((categories) => {
				res.render('admin/articles/edit', {article: article, categories: categories});	
			}).catch((err) => {
				res.redirect('/admin/categories');
				console.log(err);
			});
		} else {
			res.redirect('/admin/categories');
		}
	}).catch((err) => {
		console.log(err);
		res.send('erro');
	});
});

router.post('/admin/articles/update', (req, res) => {
	let id = req.body.id;
	let title = req.body.title.toUpperCase();
	let category = req.body.category;
	let body = req.body.body;

	console.log('Titulo: '+title);
	console.log('Id do artigo: '+id);
	console.log('Id da categoria: '+category);
	console.log('Corpo do artigo: '+body);

	Article.update({title: title, slug: slugify(title), body: body, categoryId: category}, {
		where: {
			id: id
		}
	}).then(() => {
		res.redirect('/admin/articles');
	}).catch((err) => {
		console.log('ERRO:'+ err);
	});
});

router.get('/articles/page/:num', (req, res) => {
	let page = req.params.num;
	let offset = 0;
	
	if (isNaN(page) || page == 1 || page == 0) {
		offset = 0;
	} else {
		offset = (parseInt(page) -1) * 4;
	}

	Article.findAndCountAll({
		limit: 4,
		offset: offset,
		order: [['id', 'DESC']]
	}).then((articles) => {

		let next;

		if (offset + 4 > articles.count) {
			next = false;
		} else {
			next = true;
		}
		
		let result = {
			page: parseInt(page),
			next: next,
			articles: articles
		};

		Category.findAll().then((categories) => {
			res.render('admin/articles/page', {result: result, categories: categories});
		});
	});
});

module.exports = router;