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

//Article.sync({force: true});

Category.hasMany(Article);
Article.belongsTo(Category);

module.exports = Article;