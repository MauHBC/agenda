// Quando você chama res.render() para renderizar uma visualização, 
// ..Express.js incluirá automaticamente todas as variáveis definidas em res.locals

exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

// Checagem se existe o 'user' na sessão
exports.loginRequired = (req, res, next) => { 
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer login.');
    // Sempre que eu for redirecionar, importante salvar a sessão.
    // função de callback
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};
