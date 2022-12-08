const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) => {
	res.send('Lista de usuários');
});

router.get('/admin/users/create', (req, res) => {
	res.render('admin/users/create');
});

router.post('/admin/user/create', (req, res) => {
	let {email, password} = req.body;
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);

	User.create({
		email: email,
		password: hash
	}).then(() => {
		res.redirect('/admin/users');
	}).catch((err) => {
		console.log(err);
	});
});

module.exports = router;