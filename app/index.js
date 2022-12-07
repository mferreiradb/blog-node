const express = require('express');
const app = express();

const Categories = require('./category/categoriesController.js');
const Articles = require('./articles/articlesController.js');
const Home = require('./Home/homeController.js');
const User = require('./admin/userController.js');

//CONFIGURAÇÕES DO PROJETO
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('./public'));

//ROTAS
app.use('/', Home);
app.use('/', Categories);
app.use('/', Articles);
app.use('/', User);

app.listen(8080, () => {
	console.log('Servidor online em: http://localhost:8080');
});