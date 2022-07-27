// Cria um atalho mais curto para não precisar digitar document.querySelector() sempre
const dcmt = document.querySelector.bind(document);

let nome;
let dataNasc;
let cpf;

const campoNome = dcmt("#name");
const campoLocalidade = dcmt("#localidade");
const campoLogradouro = dcmt("#logradouro");
const campoCPF = dcmt("#cpf");
const campoBairro = dcmt("#bairro");
const campoDataNasc = dcmt("#date");

const cep = dcmt("#cep");
const bairro = dcmt("#bairro").value;
const logradouro = dcmt("#logradouro").value;
const localidade = dcmt("#localidade").value;
const tamCPF = dcmt(".cpf");

const calculoAniversario = verificaAniversario();

// cria objeto para para criar dinamismo entre as páginas
const html = {
  links: [...dcmt(".abas-navegacao").children],
  contents: [...dcmt(".area-form").children],
  openTab: dcmt("[data-open]"),
  buttons: [...dcmt(".buttons").children],
  button: [...dcmt(".button").children],
  finalizacao: dcmt(".finalizacao"),
};

// evento para acompanhar a página de dados
dcmt("#dados").addEventListener("keydown", () => {
  if (validaCampoCPF()) {
    document.querySelector("#botaoAvancar").disabled = false;
  }
  if (validaCampoDATA()) {
    document.querySelector("#botaoAvancar").disabled = false;
  }
  if (validaCampoName()) {
    document.querySelector("#botaoAvancar").disabled = false;
  }
});

// evento para acompanhar a página de endereço
dcmt("#endereco").addEventListener("keypress", function () {
  if (validaCampoCEP()) {
    document.querySelector("#botaoFinalizar").disabled = false;
  }
  if (validaCampoLogradouro()) {
    document.querySelector("#botaoFinalizar").disabled = false;
  }
  if (validaCampoBairro()) {
    document.querySelector("#botaoFinalizar").disabled = false;
  }

  if (validaCampoLocalidade()) {
    document.querySelector("#botaoFinalizar").disabled = false;
  }
});

// mascara de cpf
tamCPF.addEventListener("keypress", () => {
  let inputLength = tamCPF.value.length;

  if (inputLength === 3 || inputLength === 7) {
    tamCPF.value += ".";
  } else if (inputLength === 11) {
    tamCPF.value += "-";
  }
});

// valida o cpf informado
function isCPF() {
  cpf = dcmt("#cpf").value;
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  )
    return false;
  // Valida 1o digito
  count = 0;
  for (i = 0; i < 9; i++) count += parseInt(cpf.charAt(i)) * (10 - i);
  dig = 11 - (count % 11);
  if (dig == 10 || dig == 11) dig = 0;
  if (dig != parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  count = 0;
  for (i = 0; i < 10; i++) count += parseInt(cpf.charAt(i)) * (11 - i);
  dig = 11 - (count % 11);
  if (dig == 10 || dig == 11) dig = 0;
  if (dig != parseInt(cpf.charAt(10))) return false;
  return true;
}

// valida nome usuario
function validaNome() {
  dataNasc = dcmt("#date").value;
  nome = dcmt("#name").value;
  if (nome == "" || dataNasc == "") {
    alert("Preencha todos os campos");
    return false;
  }
  localStorage.setItem("nome", nome);

  validaData();

  if (isCPF() == true) {
    localStorage.setItem("cpf", cpf);
    showActiveContent("endereco");
  }
}

function validaData() {
  dataNasc = dcmt("#date").value;
  if (dataNasc == "") {
    return;
  }
  localStorage.setItem("dtNasc", dataNasc);
}

function verificaAniversario() {
  var diaAniversario = new Date(dataNasc);
  var diaAtual = new Date();
  var idade = calcularIdade(diaAniversario) + 1;
  var proxAnoAniver = diaAniversario.getFullYear() + idade;
  var bday = new Date(
    `${
      diaAniversario.getMonth() + 1
    }/${diaAniversario.getDate()}/${proxAnoAniver}`
  ); // concatenar o mes do aniversário + o dia
  var diferenca = bday.getTime() - diaAtual.getTime();
  var dias = Math.round(diferenca / (24 * 60 * 60 * 1000));

  return dias;
}

function calcularIdade(diaAniversario) {
  var diaAtual = new Date();
  var anoAtual = diaAtual.getFullYear();

  var diaNascido = diaAniversario.getDate();
  var mesNascido = diaAniversario.getMonth();
  var anoNascido = diaAniversario.getFullYear();

  var idade = anoAtual - anoNascido;
  var mesAtual = diaAtual.getMonth() + 1;
  // se o mes atual for menor que o mes de nascimento, não fez aniversário.
  if (mesAtual < mesNascido) {
    idade--;
  } else {
    // se estiver no mes, verificar o dia
    if (mesAtual == mesNascido) {
      if (new Date().getDate() < diaNascido) {
        // se a data atual for menor que a data de nascimento ele ainda não fez aniversario
        idade--;
      }
    }
  }
  return idade;
}

// oculta conteúdo do html
function hideContent() {
  html.contents.forEach((section) => {
    section.style.display = "none";
  });
}

//Remove o conteúdo de uma aba quando outra estiver selecionada
function removeActivesTabs() {
  html.links.forEach((abas) => {
    abas.className = abas.className.replace("active", "");
  });
}

//Mostra o  conteúdo que está ativo
function showActiveContent(id) {
  hideContent();

  const abaContent = dcmt("#" + id);
  abaContent.style.display = "block";

  id.className += "active";

  if (id == "finalizacao") {
    consultaCEP();

    localStorage.setItem("cep", dcmt("#cep").value);
    localStorage.setItem("logradouro", dcmt("#logradouro").value);
    localStorage.setItem("bairro", dcmt("#bairro").value);
    localStorage.setItem("localidade", dcmt("#localidade").value);
    localStorage.setItem("number-adress", dcmt("#number-adress").value);
    localStorage.setItem("dias-ate-aniversario", verificaAniversario());

    show();
  }
}

// Ouve qual aba foi selecionada
function abaSelecionada(event) {
  removeActivesTabs();

  const target = event.currentTarget;
  showActiveContent(target.dataset.id);

  target.className += " active";
}

// Irá "ouvir" os eventos que estão ocorrendo entre as abas
function verificaEventos() {
  html.links.forEach((aba) => {
    aba.addEventListener("click", abaSelecionada);
  });

  html.buttons.forEach((click) => {
    click.addEventListener("click", abaSelecionada);
  });
}

// valida o cep informado

function consultaCEP() {
  // realiza conexão com api para trazer os dados a partir do cep informado
  const showData = (result) => {
    for (const campo in result) {
      if (document.querySelector("#" + campo)) {
        document.querySelector("#" + campo).value = result[campo];
      }
    }
  };

  // evento para verificar o foco, afim de preencher os campos de forma dinamica

  cep.addEventListener("blur", (e) => {
    let search = cep.value.replace("-", "");

    if (search.length < 8 || search === "") {
      alert("CEP invalido");
    }

    const options = {
      method: "GET",
      mode: "cors",
      cache: "default",
    };

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
      .then((response) => {
        response.json().then((data) => {
          showData(data);
          //validaPreenchimentoEndereco();
        });
      })
      .catch((e) => console.log("Deu Erro" + e.message));
  });
}

// mostra o resultado inseridos na primeira aba

function show() {
  html.finalizacao.innerHTML = `<p><br>Nome: ${localStorage.getItem(
    "nome"
  )}<\p><br>
                                                  <p>Data de Nascimento: ${localStorage.getItem(
                                                    "dtNasc"
                                                  )}<\p><br>
                                                  <p>CPF: ${localStorage.getItem(
                                                    "cpf"
                                                  )}<\p>
                                                  <br><p>${localStorage.getItem(
                                                    "logradouro"
                                                  )}<\p><br>
                                                  <p>Bairro: ${localStorage.getItem(
                                                    "bairro"
                                                  )}<\p><br>
                                                  <p>Cidade: ${localStorage.getItem(
                                                    "localidade"
                                                  )}<\p><br>
                                                  <p>Número endereço: ${localStorage.getItem(
                                                    "number-adress"
                                                  )}<\p><br>
                                                  <p>Dias até aniversário: ${localStorage.getItem(
                                                    "dias-ate-aniversario"
                                                  )}<\p><br>`;
}

// // Função que iniciará a aplicação
function startApplication() {
  hideContent();
  verificaEventos();
  localStorage.clear();

  html.openTab.click();
}

function validaCampoName() {
  if (document.querySelector("#name") === "") {
    return false;
  }
  return true;
}

function validaCampoDATA() {
  if (document.querySelector("#date") === "") {
    return false;
  }
  return true;
}

function validaCampoCPF() {
  if (
    document.querySelector("#cpf") === "" ||
    document.querySelector("#cpf").length < 14
  ) {
    return false;
  }
  return true;
}

function validaCampoCEP() {
  if (document.querySelector("#cep") === "") {
    alert("Preencha todos os campos");
    return false;
  }
  return true;
}

function validaCampoLogradouro() {
  if (document.querySelector("#logradouro") === "") {
    alert("Preencha todos os campos");
    return false;
  }
  return true;
}

function validaCampoBairro() {
  if (document.querySelector("#bairro") === "") {
    alert("Preencha todos os campos");
    return false;
  }

  return true;
}

function validaCampoLocalidade() {
  if (document.querySelector("#localidade") === "") {
    alert("Preencha todos os campos");
    return false;
  }

  return true;
}

startApplication();
