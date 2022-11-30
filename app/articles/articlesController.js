const express = require('express');
const router = express.Router();
const Category = require ('../models/Category');

router.get('/articles', (req, res) => {
	Category.findAll().then((categories) => {
		res.render('admin/articles/new', {categories: categories});
	});
});

router.post('/articles/save', () => {
  
});

module.exports = router;