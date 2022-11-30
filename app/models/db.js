const Sequelize = require('sequelize');
const banco = 'guia_press';
const db = new Sequelize(banco, 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	timezone: '-03:00'
});

db.authenticate().then(() => {
	console.log(`Banco de de dados [${banco}] conectado com sucesso!`);
}).catch((err)=>{
	console.log(err);
});

module.exports = {
	Sequelize: Sequelize,
	sequelize: db
};