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