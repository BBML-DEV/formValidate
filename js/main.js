class ValidaFormulario {

    constructor(){
        this.formulario = document.querySelector(".formulario");
        this.events();
    }

    //criando evento
    events(){
        this.formulario.addEventListener("submit", e =>{
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
    //previnindo o evento padrão
        e.preventDefault();
        const checkedField = this.checkField();
        const checkedPassword = this.passwordValid();

        if(checkedField && checkedPassword){
            alert("Formulário foi enviado.");
            this.formulario.submit();
        }
    }

    //checagem de senhas
    passwordValid() {
        let valid = true;
        const password = this.formulario.querySelector(".password");
        const passwordRepeat = this.formulario.querySelector(".password-repeat");

        if(password.value !== passwordRepeat.value){
            this.createError(password, `As senhas estão diferentes, confirme novamente!`);
            this.createError(passwordRepeat, `As senhas estão diferentes, confirme novamente!`);
            valid = false;
        }

        if(password.value.length < 6 || password.value.length > 12){
            this.createError(password, `A senha precisa ter entre 6 e 12 caracteres`);
            valid = false;
        }

        return valid;
    }

    //checagem dos campos
    checkField(){
        let valid = true;

        for(let textError of this.formulario.querySelectorAll('.error-text')){
            textError.remove();
        }

        for(let field of this.formulario.querySelectorAll('.validar')){
            const label = field.nextElementSibling.innerText;
            if(!field.value){
                this.createError(field, `${label} está vazio!`);
                valid = false;
            }

            if(field.classList.contains('cpf')){
                if(!this.validateCPF(field)) valid = false;
            }

            if(field.classList.contains('user')){
                if(!this.validateUser(field)) valid = false;
            }
        }

        return valid;
    }

    //validando cpf
    validateCPF(field){
        const cpf = new ValidarCPF(field.value);

        if(!cpf.valida()){
            this.createError(field, `CPF inválido.`);
            return false;
        } 
            return true;
    }

    //validando o usuário
    validateUser(field){
        const user = field.value;
        let valid = true;
        
        if(user.length < 3 || user.length > 12){
            this.createError(field, `O Usuário está inválido, verifique o número se o número caracteres está correto`);
            valid = false;
        }  

        if (!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(field, `Usuário precisa conter apenas letras e números`);
            valid = false;
        }
            return valid;
    }

    //cria os erros para os campos não preenchidos
    createError(field, msg){
        const div = document.createElement("div");
        div.innerHTML = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }



}

const validar = new ValidaFormulario();