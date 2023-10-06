const Contato = require('../models/ContatoModel');

exports.index = async(req, res) => {
  const contatos = await Contato.buscaContatos();
  // const imageUrl = '/images/hisis.jpg'; // Caminho relativo ao diretório "public"
  
  // criar um objeto onde a chave é "contatos" e o valor é o valor da variável contatos.
  res.render('index', { contatos }); //{ contatos: contatos });
  
};

// res.render --> é uma função do Express, um framework para aplicativos web em Node.js, 
// ..que é usada para renderizar templates de visualização 
// ..(como arquivos .ejs, .pug, .handlebars, etc.