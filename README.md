Documentação

Listar 
•	Método: GET
•	Rota: /todosResultados
•	Resposta de Sucesso: HTTP 200 OK

jsonCopy code
[ { "_id": "64a46a8fdad91f684e12dad7", "nome": "", "categoria": "", "preco": "", "__v": 0 } ] 

Novo Jogo
•	Método: POST
•	Rota: /novoJogo
•	Corpo da Requisição (Exemplo):
jsonCopy code
{ "nome": "War", "categoria": "guerra", "preco": 9.90, "createdAt": "" } 
•	Resposta de Sucesso: HTTP 201 OK
jsonCopy code
{ "message": "Jogo cadastrado" } 

Atualizar jogo 
•	Método: PATCH
•	Rota: /atualizaJogo/{id}
•	Parâmetros da URL:
•	id (string): ID do jogo a ser alterado
•	Corpo da Requisição (Exemplo):
jsonCopy code
{ "nome": "novo nome", "categoria": "categoria nova", "preco": "novo preço" } 
•	Resposta de Sucesso: HTTP 404 OK
jsonCopy code
{ "message": "Jogo Atualizado" } 

Deletar Jogo
•	Método: DELETE
•	Rota: /deletarJogo/{id}
•	Parâmetros da URL:
•	id (string): ID do jogo a ser deletado
•	Requer autenticação
•	Resposta de Sucesso: HTTP 200 NO CONTENT
jsonCopy code
{ "message": "Jogo deletado" } 

Usuários

Cadastrar Usuário
•	Método: POST
•	Rota: /novoUsuario
•	Corpo da Requisição (Exemplo):
jsonCopy code
{ "nome": "userteste", "email": "email@teste.com", "password": "mandioca" } 
•	Resposta de Sucesso: HTTP 201 OK
jsonCopy code
{ "message": "Usuário criado com sucesso" } 

Login
•	Método: POST
•	Rota: /login
•	Corpo da Requisição (Exemplo):
jsonCopy code
{ "nome": "userteste", "email": "email@teste.com", "password": "mandioca" } 
•	Retorna um bearer token para autenticação
•	Resposta de Sucesso: HTTP 200 OK
jsonCopy code
{ "message": "Login efetuado com sucesso", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODg1MTIyODN9.xOTtcbcOsrOEkO-cuK0Lfl7UjEoQv0cGYnVNSFKXHkI" } 

Arquitetura do projeto:
📂 API
├─ 📂 src
│ ├─ 📂 controllers
│ │ └─ autUser.js
│ │ └─ jogoControllers.js
│ ├─ 📂 database
│ │ └─ jogoConfig.js
│ ├─ 📂 models
│ │ └─ jogoModels.js
│ │ └─ jogoSchema.js
│ │ └─ userSchema.js
│ ├─ 📂 middlewares
│ │ └─ authMiddlewares.js
│ ├─ 📂 routes
│ │ └─ jogoRoutes.js
│ └─ app.js
├─ .env
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ README.md
└─ server.js

Dependências 
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.4.0"