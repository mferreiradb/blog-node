const express = require('express');
const app = express();
const db = require('./models/db.js');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(8080, () => {
	console.log('Servidor online em: http://localhost:8080');
});