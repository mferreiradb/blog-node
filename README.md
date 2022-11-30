i**PROJETO DE BLOG COM NODDE JS**

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

- Slugify

        npm i --save slugify

- TinyMCE

    - Baixar em:

        https://www.tiny.cloud/get-tiny/self-hosted/

    - Após o download do arvivo zip, basta colocar a pasta que está dentro do zip na pasta public

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

*Transformando títulos em slugs*

- Utilização da biblioteca Slugify

    - Utiliza-se a função slugify() e passando um valor. O valor na função será convertido para slug

                router.post('/categorires/save', (req, res) => {
                    const title = req.body.title.toUpperCase();

                    if (title.length > 0) {
                        console.log(`Dado: ${title}\ntamanho: ${title.length}`);
                        Category.create({
                            title: title,
                            slug: slugify(title)
                        }).then(() => {
                            res.redirect('/');
                        });
                    } else {
                        res.redirect('/admin/categories/new');
                        console.log('Conteúdo inválido');
                    }
                });

*Exclusão de dados via post*

- A rota verifica se o dado enviado é um numero, pois está sendo referenciado o ID

                router.post('/categories/delete', (req, res) => {
                    var id = req.body.id;

                    if (id.length > 0) {
                        if (!isNaN(id)) {
                            Category.destroy({
                                where: {
                                    id: id
                                }
                            }).then(() => {
                                res.redirect('/admin/categories');
                            });
                        } else {
                            res.redirect('/admin/categories');
                        }
                    } else {
                        res.redirect('/admin/categories');
                    }
                });

- O botão para exclusão é englobado por um form e recebe um input invisível com o valor que deverá ser passado

                <tbody>
                    <% categories.forEach((category) => { %>
                        <tr>
                            <th><%= category.id %></th>
                            <th><%= category.title %></th>
                            <th><%= category.slug %></th>
                            <th>
                                <button class="btn btn-warning person">Editar</button>
                                
                                <form method="POST" action="/categories/delete" class="person">

                                    <input type="hidden" name="id" value="<%= category.id %>">

                                    <button class="btn btn-danger person" type="submit">Excluir</button>

                                </form>
                            </th>
                        </tr>
                    <% }) %>
                </tbody>

*Implementação de confirmação de exclusão*

- Em uma tag <script></script> diciona-se uma função dom com evento preventDefault(), que interrompe a submissão do formulário
- Após a interrupção da submissão do relatório, adicionamos a confirmação de exclusão
- A função recebe dois parametro: o primeiro se refere ao evento que está sendo executado (submissão do formulário), o segundo se refere a qual elemento está disparando o evenro (formulário)
- Os parametros devem ser passados em um evendo onsubit="" no formulário html. A referencia ao evento permanece como o nome do parametro, porém a referencia ao elemento html é passada como "this", pois está sendo referenciado no proprio elemento que dispara o evento

                <form method="POST" action="/categories/delete" class="person" onsubmit="confirmDelete(event, this)">

                    <input type="hidden" name="id" value="<%= category.id %>">

                    <button class="btn btn-danger person" type="submit">Excluir</button>
                    
                </form>

                <script>
                    const confirmDelete = (event, form) =>{
                        event.preventDefault();
                        let decision = confirm('Deseja excluir a categoria?');
                        if (decision) {
                            alert('Categoria excluída');
                            form.submit();
                        } else {
                            alert('Categoria não excluída');
                        }
                    }
                </script>

*Buscando registro por id*

- Utiliza-se a função findByPk()

                router.get('/admin/categories/edit/:id', (req, res) => {
                    let id = req.params.id;

                    if (isNaN(id)){
                        res.redirect('/admin/categories');
                    }

                    Category.findByPk(id).then((category) => {

                        if (id.length > 0) {

                            res.render('admin/categories/edit', {category: category});
                            
                        } else {
                            res.redirect('/admin/categories');
                        }

                    // eslint-disable-next-line no-unused-vars
                    }).catch((err) => {
                        res.redirect('/admin/categories');
                    });
                });

*Utilizando TinyMCE*

- Carrega-se o script do TinyMCE na view que desejamos utilizar

                <script src="/tinymce/js/tinymce/tinymce.min.js"></script>

- Após a importação do script, adicionamos um ID na textarea que desejamos aplicar as ferramentas e em uma tag script apontamos o id para que sejam adicionadas as funcionalidades

                <script>
                    tinymce.init({
                        selector: '#article'
                    })
                </script>

- É possível adicionar mais funcionalidades ao TinyMCE através dos plugins

    - Para adicionar novos plugins, basta acrescentar ao script, a propriedade plugins e informar em um array os plugins desejados. Os plugins são informados englobados nas mesmas aspas e são separados por espaços

                <script>
                    tinymce.init({
                        selector: '#article',
                        plugins: 'lists advlist autolink link image print preview searchreplace wordcount fullscreen insertdatetime media save table paste emoticons'
                    })
                </script>

    - Advlist

        - Cria listas
    
    - Autolink

        - Quando um link for copiado e colado no texto, ele será estilizado automaticamente
    
    - link

        - Cria links com botão
    
    - Image

        - Permite adicionar imagens
    
    - Lists

        - Listas simples
    
    - Print

        - Para imprimir o artigo
    
    - Preview

        - Previsualização do que está sendo escrito

    - Hr

        - Adiciona uma linha

    - Searchreplace

        - Para pesquisar utilizando ctrl + f
    
    - Wordcount

        - Informa a quantidade de palavras escritas
    
    - Fullscreen

        - para abrir o editor em tela cheia

    - Insertdatetime

        - Insere a data no texto
    
    - Media

        - Para inserção de midias
    
    - Save

        - Para salvar como um arquivo no pc
    
    - Table

        - Para criar tabelas
    
    - Paste

        - Colagem diferente
    
    - Emoticons

        - Inserir emoticons no post

- Alteração da linguagem do TinyMCE

    - Basta baixar o pacote da lingua desejada em

                https://www.tiny.cloud/get-tiny/language-packages/

    - Após o download do script para tradução, basta colocar o script dentro de tinymce\js\tinymce\langs