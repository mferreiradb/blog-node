const db = require('./db.js');
const Sequelize = require('sequelize');

const Article = db.sequelize.define('articles', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	slug: { //TITULO POSSÍVEL DE SER UTILIZADO EM UMA URL
		type: Sequelize.STRING,
		allowNull: false
	},
	body: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

module.exports = Article;