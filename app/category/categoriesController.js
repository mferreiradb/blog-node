const express = require('express');
const router = express.Router();

router.get('/admin/categories/new', (req, res) => {
	res.render('admin/categories/new.ejs');
});

module.exports = router;