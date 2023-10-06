import validator from 'validator';

export default class Login {
  constructor(formClass) { 
    this.form = document.querySelector(formClass);
    }

  // adicionar um ouvinte de eventos no formulário HTML selecionado pelo seletor CSS `formClass`.
  // Especificamente, ele adiciona um ouvinte de eventos para o evento
  // `submit` no formulário e chama a função `validate()` quando o formulário é submetido.
    init() {
    this.events();
  }

  events() {
    //se o formulário não existe, return.
    if(!this.form) return; 

    // O segundo argumento, é uma função que será executada quando o evento ocorrer.
    this.form.addEventListener('submit', e => {

      // Comportamento padrão seria recarregar a página. 
      // Ao chamar e.preventDefault(), evitamos que a página seja recarregada ao enviar o formulário.
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    let error = false;

    if(!validator.isEmail(emailInput.value)) {
      alert('E-mail inválido');
      error = true;
    }

    if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
      alert('Senha precisa ter entre 3 e 50 caracteres');
      error = true;
    }

    // enviar um formulário HTML para o servidor.
    if(!error) el.submit();
  }
}
