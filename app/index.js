const express = require('express');
const app = express();
const db = require('./models/db.js');

const Categories = require('./categories/categoriesController.js');
const Articles = require('./articles/articlesController.js');
const Home = require('./Home/homeController.js');

//CONFIGURAÇÕES DO PROJETO
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('./public'));

//ROTAS
app.use('/', Home);
app.use('/', Categories);
app.use('/', Articles);

app.listen(8080, () => {
	console.log('Servidor online em: http://localhost:8080');
});