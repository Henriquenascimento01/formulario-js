// Cria um atalho mais curto para não precisar digitar document.querySelector() sempre
const dcmt = document.querySelector.bind(document)


const cep = dcmt('#cep');
const bairro = dcmt('#bairro').value
const logradouro = dcmt('#logradouro').value

// cria objeto para para criar dinamismo entre as páginas
const html = {

    links: [...dcmt('.abas-navegacao').children],
    contents: [...dcmt('.area-form').children],
    openTab: dcmt('[data-open]'),
    buttons: [...dcmt('.buttons').children],
    button: [...dcmt('.button').children],
    finalizacao: dcmt('.finalizacao'),
};

// valida o cpf informado
function isCPF() {
    cpf = dcmt('#cpf').value
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11) return false;
    // Valida 1o digito	
    count = 0;
    for (i = 0; i < 9; i++)
        count += parseInt(cpf.charAt(i)) * (10 - i);
    dig = 11 - (count % 11);
    if (dig == 10 || dig == 11)
        dig = 0;
    if (dig != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito	
    count = 0;
    for (i = 0; i < 10; i++)
        count += parseInt(cpf.charAt(i)) * (11 - i);
    dig = 11 - (count % 11);
    if (dig == 10 || dig == 11)
        dig = 0;
    if (dig != parseInt(cpf.charAt(10)))
        return false;
    return true;
};

// valida name usuario
function validaNome() {
    nome = dcmt('#name').value
    if (nome == '') {
        alert("Digite seu nome")
        
    }
    localStorage.setItem('nome', nome)
    validaData()

    if (isCPF() == true) {
        localStorage.setItem('cpf', cpf)
        showActiveContent('endereco')

    } else
        alert('CPF inválido');
    
};


function validaData() {
    dataNasc = dcmt('#date').value
    if (dataNasc == '') {
        alert('Digite sua data de nascimento')
        
    }
    localStorage.setItem('dtNasc', dataNasc)

};



// oculta conteúdo do html
function hideContent() {

    html.contents.forEach(section => {
        section.style.display = 'none'
    })
};

//Remove o conteúdo de uma aba quando outra estiver selecionada 
function removeActivesTabs() {
    html.links.forEach(abas => {
        abas.className = abas.className.replace("active", "");
    })
};

//Mostra o  conteúdo que está ativo 
function showActiveContent(id) {
    hideContent()

    const abaContent = dcmt('#' + id)
    abaContent.style.display = "block"

    id.className += "active";

};

// Ouve qual aba foi selecionada
function abaSelecionada(event) {

    removeActivesTabs()

    const target = event.currentTarget
    showActiveContent(target.dataset.id)

    target.className += " active"

}

// Irá "ouvir" os eventos que estão ocorrendo entre as abas
function verificaEventos() {
    html.links.forEach(aba => {
        aba.addEventListener('click', abaSelecionada)
    })

    html.buttons.forEach(click => {
        click.addEventListener('click', abaSelecionada)
    })

};

// valida o cep informado 
if (cep.length < 9) {
    alert('CEP invalido')
} else {

    // realiza conexão com api para trazer os dados a partir do cep informado
    const showData = (result) => {
        for (const campo in result) {
            if (document.querySelector("#" + campo)) {
                document.querySelector("#" + campo).value = result[campo]
            }
        }
    
        localStorage.setItem('cep', result.cep)
        localStorage.setItem('logradouro', result.logradouro)
        localStorage.setItem('bairro', result.bairro)

    }

    // evento para verificar o foco, afim de preencher os campos de forma dinamica 
    cep.addEventListener("blur", (e) => {
        let search = cep.value.replace("-", "")

        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }

        fetch(`https://viacep.com.br/ws/${search}/json/`, options)

            .then(response => {
                response.json()
                    .then(data => showData(data))



            })
            .catch(e => console.log('Deu Erro' + e.message))
    })
};

// mostra o resultado inseridos na primeira aba 

function show() {

    html.finalizacao.innerHTML = `<p><br>Nome: ${localStorage.getItem('nome')}<\p><br>
                                              <p>Data de Nascimento: ${localStorage.getItem('dtNasc')}<\p><br>
                                              <p>CPF: ${localStorage.getItem('cpf')}<\p>
                                              <br><p>${localStorage.getItem('logradouro' )}<\p><br>
                                              <p>Bairro: ${localStorage.getItem('bairro' )}<\p><br>`
};


// // Função que iniciará a aplicação
function startApplication() {

    hideContent()
    verificaEventos()
    localStorage.clear()

    html.openTab.click()

};


startApplication()



