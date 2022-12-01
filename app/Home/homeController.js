const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Category = require('../models/Category');

router.get('/', (req, res) => {
	Article.findAll({
		include: [{model: Category}]
	}).then((articles) => {
		res.render('index', {articles: articles});
	});
});

module.exports = router;