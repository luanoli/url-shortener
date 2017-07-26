# url-shortener

Aplicação em nodejs para um serviço de Encurtador de URL

## Recursos utilizados
- Node.js
- Express.Js
- Mongoose
- RESTful
- MongoDB
- Mocha
- Chai

## Pré-requisitos

Para executar a aplicação é necessário ter instalado o Node.js e MongoDB

Ubuntu:

Instalar nodejs:
```
sudo apt-get install nodejs
```

Instalar npm:
```
sudo apt-get install npm
```

Instalar MongoDB:
```
Importar chave para o repositório do MongoDB:
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927

Adicionar detalhes par ao apt encontrar os pacotes e baixar:
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

Atualizar pacotes e instalar MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org
```

Iniciar serviço do MongoDB:
```
mongod
```

##Instalação

No diretório raiz da aplicação onde está localizado o arquivo package.json, executar o seguinte comando para instalar as dependências:
```
npm install
```

##Executar a aplicação

No diretório raiz da aplicação executar:
```
npm run start
```

##Executar testes

No diretório raiz da aplicação executar:
```
npm test
```

##Endpoints

|URI|Método|Descrição|
|:----:|:---:|----|
|/urls/:id|GET|Retorna 301 redirect para o endereço original da URL|
|/users/:userid/urls|POST|Cadastra nova URL|
|/stats|GET|// Retorna estatísticas globais|
|/users/:userid/stats|GET|Retorna estatísticas por usuário|
|/stats/:id|GET|Retorna estatísticas por URL|
|/urls/:id|DELETE|Exclui uma URL|
|/users|POST|Cadastra novo usuário|
|/user/:userid|DELETE|Exclui um usuário|
|/users|GET|Retorna todos os usuários|
|/:simbols|GET|O parâmetro da URL encurtada retorna 301 e redirecionapara a URL original e adiciona um hit na URL cadastrada|


