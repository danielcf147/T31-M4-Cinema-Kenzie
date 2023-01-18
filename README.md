# Cinema Kenzie

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn install
````
<br>

**Configure as variáveis de ambiente no seu .env**, passando as credenciais corretas para conectar em seu banco local


Com isso feito, para rodar sua aplicação, basta utilizar o comando
````
yarn dev
````
<br> 
# **Sobre as rotas**


````
Rotas User:
POST: /user - {Parametros: name(tipo string), email(tipo string), age(tipo number), cpf(tipo string), password(tipo string)}
GET: /user
PATCH: /user/:id - {Parametros: name(tipo string), email(tipo string), age(tipo number), cpf(tipo string), password(tipo string)}{Necessario token de autenticação}
DELETE: /user/:id - {Parametro: isActive(tipo boolean)}{Necessario token de autenticação}
````
````
Rotas Employee:
POST: /employee - {Parametros: name(tipo string), registration(tipo string), age(tipo number), isAdm(tipo boolean), password(tipo string)}
GET: /employee - {Necessario token de autenticação e acessada apenas por adm}
PATCH: /employee/:id - {Parametros: name(tipo string), registration(tipo string), age(tipo number), isAdm(tipo boolean), password(tipo string)}{Necessario token de autenticação e acessada apenas por adm}
DELETE: /employee/:id - {Parametro: isActive(tipo boolean)}{Necessario token de autenticação}{Necessario token de autenticação e acessada apenas por adm}
````
````
Rotas Login:
POST: /login - {Parametros: email(tipo string), password(tipo string)}
POST: /login/empolyer - {Parametros: registration(tipo string), password(tipo string)}
````
````
Rotas Category Movies:
POST: /categories/movies - {Parametro: name(tipo string)}{Necessario token de autenticação e acessada apenas por adm}
GET: /categories/movies
GET: /categories/movies/:id
````
````
Rotas Movies:
POST: /movies - {Parametros: name(tipo string), director(tipo string), synopsis(tipo string), release_date(tipo string), categoryMovie_id(tipo string)}{Necessario token de autenticação e acessada apenas por adm}
GET: /movies
GET: /movies/:id 
GET: /movies/:categoryId
````
````
Rotas Rooms:
POST: /rooms - {Parametros: name(tipo string), movie_id(tipo string), is3D(tipo boolean), seats(tipo number)}{Necessario token de autenticação e acessada apenas por adm}
GET: /rooms 
PATCH: /rooms/:id - {Parametros: name(tipo string), movie_id(tipo string), is3D(tipo boolean), seats(tipo number)}{Necessario token de autenticação e acessada apenas por adm}
````
````
Rotas Category Products:
POST: /categories/products - {Parametros: name(tipo string)}{Necessario token de autenticação e acessada apenas por adm}
GET: /categories/products
GET: /categories/products/:id
````
````
Rotas Product:
POST: /products - {Parametros: name(tipo string), price(tipo number), stock(tipo number), categoryFoodId(tipo string)}{Necessario token de autenticação e acessada apenas por adm}
GET: /products
GET: /products/:id
GET: /products/category/:id
PATCH: /products/:id - {Parametros: price(tipo number), stock(tipo number)}{Necessario token de autenticação e acessada apenas por adm}
DELETE: /products/:id - {Necessario token de autenticação e acessada apenas por adm}
````
````
Rotas Order:
POST: /order - {Parametros: status(tipo string, passando StandBy como parametro), food(tipo array passando um objeto com as keys de id(tipo string) e total(tipo number)}{Necessario token de autenticação}
GET: /order - {Necessario token de autenticação e acessada apenas por adm ou employee}
````
````
Rotas Tickets:
POST: /tickets - {Parametros: room_id(tipo string), movie_id(tipo string)}{Necessario token de autenticação}
GET: /tickets - {Necessario token de autenticação e acessada apenas por adm ou employee}
````
<br>

# **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

<br>


# **Rodando os testes** 

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes
````
yarn test
````
#
### Rodar todos os testes e ter um log ainda mais completo
````
yarn test --all
````
#

### Rodar os testes de uma pasta específica
`detalhe: repare que tests está envolvido por 2 underlines. Isso se chama dunder.`
````
yarn test ./scr/__tests__/integration/<subpasta>
````
#
### Rodar os testes de um arquivo específico
````
yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
````
#
### Rodar um teste específico
````
yarn test -t <describe ou test específico envolto em aspas>
````
````
\\ ex: yarn test -t "/categories"
\\ rodaria os testes do describe "/categorias" no caminho
\\ ./scr/__tests__/integration/categories/categoriesRoutes.test.ts
````

<br>


**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.

#



### Agora que já sabe como iniciar o seu projeto e rodar os testes, é hora de colocar a mão no código!
