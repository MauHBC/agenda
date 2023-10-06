// Essas importações garantem que o código JavaScript seja executado corretamente, independentemente da versão do navegador em uso.
// ECMAScript (conjunto de regras e diretrizes que os navegadores e outras plataformas devem seguir para implementar o JavaScript)
import 'core-js/stable';  // biblioteca que fornece funcionalidades do ECMAscript
import 'regenerator-runtime/runtime'; // polifill necessário para suportar recursos avançados, como o uso de geradores e async/await.

import Login from './modules/Login';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');

// método para inicializar as variáveis
login.init();
cadastro.init();

// import './assets/css/style.css';

