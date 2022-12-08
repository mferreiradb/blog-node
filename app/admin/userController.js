const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) => {
	User.findAll().then((users) => {
		res.render('admin/users/index', {users: users});
	}).catch((err) => {
		console.log(err);
	});
});

router.get('/admin/users/new', (req, res) => {
	res.render('admin/users/create');
});

router.post('/admin/user/create', (req, res) => {
	let {email, password} = req.body;
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);

	User.findOne({
		where: {email: email}
	}).then((user) => {
		if (user == undefined) {
			User.create({
				email: email,
				password: hash
			}).then(() => {
				res.redirect('/admin/users');
			}).catch((err) => {
				console.log(err);
			});
		} else {
			res.redirect('/admin/users/new');
		}
	}).catch((err) => {
		console.log(err);
	});
});

router.post('/admin/user/delete', (req, res) => {
	var {id} = req.body;

	if (id.length > 0) {
		if (!isNaN(id)) {
			User.destroy({
				where: {
					id: id
				}
			}).then(() => {
				res.redirect('/admin/users');
			});
		} else {
			res.redirect('/admin/users');
		}
	} else {
		res.redirect('/admin/users');
	}
});

module.exports = router;