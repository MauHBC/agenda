// Importa a biblioteca mongoose para interagir com o MongoDB
const mongoose = require('mongoose');

// Importa a biblioteca validator para validar dados
const validator = require('validator');

// Importa a biblioteca bcryptjs para criptografia de senhas
const bcryptjs = require('bcryptjs');

// Define um esquema para o modelo "Login"
const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

// Cria um modelo "Login" baseado no esquema definido acima
const LoginModel = mongoose.model('Login', LoginSchema);

// Define uma classe chamada "Login"
class Login {
  constructor(body) {
    this.body = body; // Armazena os dados do formulário
    this.errors = []; // Armazena erros de validação
    this.user = null; // Armazena o usuário encontrado
  }

  // Método para realizar o login
  async login() {
    this.valida(); // Executa a validação dos dados
    if(this.errors.length > 0) return; // Se houver erros, retorna

    // Busca um usuário pelo e-mail fornecido
    this.user = await LoginModel.findOne({ email: this.body.email });

    // Se não encontrar o usuário, adiciona um erro
    if(!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    // Compara a senha fornecida com a senha armazenada usando bcryptjs
    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null; // Reseta o usuário encontrado
      return;
    }
  }

  // Método para realizar o registro de um novo usuário
  async register() {
    this.valida(); // Executa a validação dos dados
    if(this.errors.length > 0) return; // Se houver erros, retorna

    await this.userExists(); // Verifica se o usuário já existe
    if(this.errors.length > 0) return; // Se já existir, retorna

    const salt = bcryptjs.genSaltSync(); // Gera um salt para a senha
    this.body.password = bcryptjs.hashSync(this.body.password, salt); // Criptografa a senha

    // Cria um novo usuário no banco de dados
    this.user = await LoginModel.create(this.body);
  }

  // Método para verificar se o usuário já existe
  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if(this.user) this.errors.push('Usuário já existe.');
  }

  // Método para validar os dados do formulário
  valida() {
    this.cleanUp(); 

    // O e-mail precisa ser válido
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

    // A senha precisa ter entre 3 e 50 caracteres
    if(this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }
  }

  // Método para remover espaços em branco desnecessários dos campos
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = ''; // Se não for string, define como vazio
      }
    }

    // Mantém apenas os campos email e password no objeto body
    this.body = {
      email: this.body.email,
      password: this.body.password
    };
  }
}

// Exporta a classe "Login" para uso em outros arquivos
module.exports = Login;
