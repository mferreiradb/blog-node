**PROJETO DE BLOG COM NODDE JS**

*Dependencias*

- Express

        npm i --save express

- Sequelize 

        npm i --save sequelize

- Mysql

        npm i --save mysql2

- Ejs

        npm i --save ejs

- EsLint

        npm init @eslint/config

- Bootstrap

    - Baixar no site e jogar os arquivos dentro  do projeto (versão 4.5 é usada neste exemplo)
    - Importar o CSS e JS do bootstrap no html

                    <link rel="stylesheet" href="/css/bootstrap.min.css">

    - Para a importação do JS são necessárias duas dependências
    - Os demais CSS, que não forem do bootstrap, devem ser colocados depois do CSS do bootstrap
    - Faz-se a importação das dependências e do arquivo JS do bootstrap
    - A ordem deve ser a exata a seguir de acordo com a versão que estiver sendo utilizada

                    <script
                    src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossorigin="anonymous"
                    ></script>
                    <script
                    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
                    integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
                    crossorigin="anonymous"
                    ></script>
                    <script src="/js/bootstrap.min.js"></script>

    *REUTILIZANDO HTML COM PARTIALS*

    - Partes de layouts que podem ser reutilizadas em outras páginas (componentes)
    - Usa-se a função include para chamar o arquivo do componente desejado, apontando a propriedade partials seguido do caminho e nome do arquivo

                    <%- include('partials/header.ejs') %>

*ARQUITETURA DE PASTAS*

- models

    - Camada de manipulação e acesso aos dados
    - Arquivos de conexão com o Banco de Dados e tabelas
    - Arvos de comunicação com APIs de dados

- public

    - Arquivos CSS, EJS, HTML, IMG

- views

    - Camada de interface
    - Arquivos das páginas (HTML/EJS)

- controllers
    
    - Camada de controle
    - Arquivos que guardam as lógicas das rotas
    - Neste projeto, cada ccontroller terá sua pasta, ao invés de permanecerem todos os arquivos em uma única página Controller

*Express Router*

- Ao dividir-se os controllers, usa-se as rotas do express para a construção das rotas

- Após a contrução das rotas,e xporta-se o módulo

                cnst express = require('express');
                const router = express.Router();
                router.get('/categories', (req, res) => {
                    res.send('Rota de categorias');
                });

                module.exports = router;

- No index.js, para a utilização da rota, importa-se o módulo e usa-se app.use()
- Antes da passagem da rota, define-se um prefixo. A rota torna-se acessível somente sendo acessada após o prefixo

                const Categories = require('./categories/categoriesController.js');

                app.use('/cat', Categories);

- Com o prefixo, a rota passa a ser acessada somente por http://localhost:8080/cat/categories
- Para que não haja prefixo, coloca-se apenas uma barra, de form que a rota possa ser acessada somente por http://localhost:8080/categories

*Definição dos models*

- Definir os models que serão utilizados

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

*Definição do relacionamento das tabelas*

- Em um dos models, importa-se o model que deseja estabelecer a relação

- Utiliza-se a função belongsTo() na variável do model que está importando, tendo como valor o model importado
    - Desta forma, diz-se que o model que executa a função pertence ao model que está no valor
    - Forma de representar um relacionamento um para um no Sequelize

- Utiliza-se a função hasMany() na variável do model que está sendo importado, tendo como valor o model importando
    - Desta forma, diz-se que o model que executa a função contém o model que está no valor
    - Forma de representar um relacionamento um para para muitos no Sequelize

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

                module.exports = Article;

- Sempre que se define um relacionamento, deve ser feita a atualização do Banco de Dados

                Category.sync({force: true});
                Article.sync({force: true});
