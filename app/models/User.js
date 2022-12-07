const db = require('./db.js');
const Sequelize = require('sequelize');

const User = db.sequelize.define('users', {
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

//User.sync({force: true});

module.exports = User;