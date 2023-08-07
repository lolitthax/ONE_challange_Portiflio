class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
        this.url = this.form.getAttribute("action");
      }
      this.sendForm = this.sendForm.bind(this);
    }
  
    displaySuccess() {
      this.form.innerHTML = this.settings.success;
    }
  
    displayError() {
      this.form.innerHTML = this.settings.error;
    }
  
    getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }
  
    onSubmission(event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const nomeError = document.getElementById("nomeError");
      const email = document.getElementById("email");
      const emailError = document.getElementById("emailError");
      const assunto = document.getElementById("assunto").value;
      const assuntoError = document.getElementById("assuntoError");
      const mensagem = document.getElementById("mensagem").value;
      const mensagemError = document.getElementById("mensagemError");

      if (nome === '') {
        nomeError.textContent = "Digite seu nome";
        return false;
      } else {
        nomeError.textContent = "";
      }

      if (!email.validity.valid) {
        if (email.validity.valueMissing) {
          emailError.textContent = "Digite um endereço de email";
          return false;
        } else if (email.validity.typeMismatch) {
          emailError.textContent = "Digite um endereço de email valido";
          return false;
        } 
      } else {
        emailError.textContent = "";
      }

      if (assunto === '') {
        assuntoError.textContent = "Digite o assunto";
        return false;
      } else {
        assuntoError.textContent = "";
      }

      if (mensagem === '') {
        mensagemError.textContent = "Digite sua mensagem";
        return false;
      } else {
        mensagemError.textContent = "";
      }

      event.target.disabled = true;
      event.target.innerText = "Enviando...";
      return true;
    }
  
    async sendForm(event) {
      try {
        if (this.onSubmission(event)) {
          await fetch(this.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()),
          });
          this.displaySuccess();
        }
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }
  
    init() {
      if (this.form) this.formButton.addEventListener("click", this.sendForm);
      return this;
    }
  }
  
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h3 class='success'>Mensagem enviada!</h3>",
    error: "<h3 class='error'>Houve um erro ao enviar sua mensagem.</h3>",
  });
  formSubmit.init();


  