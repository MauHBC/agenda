// Models: Responsáveis pela manipulação dos dados, regras de negócio e interações com o banco de dados.

// Views: Responsáveis pela apresentação visual dos dados ao usuário, incluindo a interface gráfica.

// Controllers: Responsáveis pela lógica de controle e coordenação das ações do usuário, fazendo a ligação entre as views e os models.

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    app.emit('pronto');
  })
  .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
// const helmet = require('helmet'); // helmet começou a causar problemas no localhost por conta da falta de SSL
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet()); // helmet começou a causar problemas no localhost por conta da falta de SSL
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// Configurando o que salvar nas sessões
const sessionOptions = session({
  secret: 'akasdfj0út23453456+54qt23qv  qwf qwer qwer qewr asdasdasda a6()', //Chave aleatória inventada pelo autor
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());

// configura o diretório onde o Express.js deve procurar por arquivos de visualização (templates) que serão renderizados
//  __dirname é uma variável global que representa o diretório do arquivo atual
app.set('views', path.resolve(__dirname, 'src', 'views'));

// 'view engine' é a opção que estamos configurando, indicando qual mecanismo de visualização será usado. No caso, Ejs.
app.set('view engine', 'ejs');

app.use(csrf());
// Nossos próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.use(express.static(__dirname + './app/public'));

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });
});
