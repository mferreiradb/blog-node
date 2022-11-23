const db = require('./db.js');
const Sequelize = require('sequelize');

const Category = db.sequelize.define('categories', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	slug: { //TITULO POSSÍVEL DE SER UTILIZADO EM UMA URL
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Category;