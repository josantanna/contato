class Contato {
    constructor(nome, sobrenome, email, cpf, telefone, tipoContato, mensagem) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.tipoContato = tipoContato;
        this.mensagem = mensagem;
    }
}

function Post(form) {
    let data = new Contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("sobrenome").value, 
        form.elements.namedItem("email").value, 
        form.elements.namedItem("cpf").value, 
        form.elements.namedItem("telefone").value,
        form.elements.namedItem("tipo-contato").value,
        form.elements.namedItem("mensagem").value
    );
    
}

function Enviar() {
    var nome = document.querySelector("input[name='nome']").value;
    if (nome !== "Por favor, preencha os dados solicitados") {
        alert('Obrigado sr(a) ' + nome + '! Sua mensagem foi enviada com sucesso.');
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    for(let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for(let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

function validarTelefone(telefone) {
    return /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(telefone);
}

function validarFormulario(form) {
    
    if(!validarCPF(form.elements.namedItem("cpf").value)) {
        alert("CPF inválido!");
        return false;
    }    

    if(!validarTelefone(form.elements.namedItem("telefone").value)) {
        alert("Telefone inválido! Formato esperado: (DD) 99999-9999");
        return false;
    }
    
    return true;
}

function Post(form) {
    if(!validarFormulario(form)) return false;
    
    let data = new Contato(
        form.elements.namedItem("nome").value,
        form.elements.namedItem("sobrenome").value, 
        form.elements.namedItem("email").value, 
        form.elements.namedItem("cpf").value, 
        form.elements.namedItem("telefone").value,
        form.elements.namedItem("tipo-contato").value,
        form.elements.namedItem("mensagem").value
    );
    
       return true;
}


function aplicarMascaras() {
    const cpfField = document.querySelector("input[name='cpf']");
    cpfField.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
    
    const telField = document.querySelector("input[name='telefone']");
    telField.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        }
        if (value.length > 10) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });
}

document.addEventListener('DOMContentLoaded', aplicarMascaras);

function Enviar() {
    const btnEnviar = document.querySelector(".btn-enviar");
    const originalText = btnEnviar.textContent;
    
    btnEnviar.disabled = true;
    btnEnviar.textContent = "Enviando...";
    btnEnviar.style.opacity = "0.7";
    
    setTimeout(() => {
        var nome = document.querySelector("input[name='nome']").value;
        alert('Obrigado sr(a) ' + nome + '! Sua mensagem foi enviada com sucesso.');
        
        btnEnviar.disabled = false;
        btnEnviar.textContent = originalText;
        btnEnviar.style.opacity = "1";
        
        document.querySelector("form").reset();
    }, 1500);
}