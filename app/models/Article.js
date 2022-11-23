const db = require('./db.js');
const Sequelize = require('sequelize');
const Category = require('./Category.js');

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

Category.hasMany(Article);
Article.belongsTo(Category);

//Article.sync({force: true});

module.exports = Article;