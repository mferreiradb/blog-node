const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) => {
	User.findAll().then((users) => {
		res.render('admin/users/index', { users: users });
	}).catch((err) => {
		console.log(err);
	});
});

router.get('/admin/users/new', (req, res) => {
	res.render('admin/users/create');
});

router.get('/admin/users/edit/:id', (req, res) => {
	let { id } = req.params;

	if (isNaN(id)) {
		res.redirect('admin/users');
	}
	User.findByPk(id).then((user) => {
		if (user != undefined) {
			res.render('admin/users/edit', { user: user });
		} else {
			res.redirect('admin/users');
		}
	}).catch((err) => {
		console.log(err);
	});
});

router.post('/admin/user/create', (req, res) => {
	let { email, password } = req.body;
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);

	User.findOne({
		where: { email: email }
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
	var { id } = req.body;

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

router.post('/admin/user/update', (req, res) => {
	let { email, password, id } = req.body;
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);

	User.update({ email: email, password: hash }, {
		where: {
			id: id
		}
	}).then(() => {
		res.redirect('/admin/users');
	}).catch((err) => {
		console.log(err);
	});
});

router.get('/login', (req, res) => {
	res.render('admin/users/login');
});

router.post('/admin/user/authenticate', (req, res) => {
	let { email, password } = req.body;



	User.findOne({
		where: { email: email }
	}).then((user) => {
		if (user != undefined) {
			let correct = bcrypt.compareSync(password, user.password);

			if (correct) {
				req.session.user = {
					id: user.id,
					email: user.email
				};
				res.json(req.session.user);
			} else {
				res.redirect('/login');
			}
		} else {
			res.redirect('/login');
		}
	}).catch((err) => {
		console.log(err);
	});
});

module.exports = router;