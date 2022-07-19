// Cria um atalho mais curto para não precisar digitar document.querySelector() sempre
const dcmt = document.querySelector.bind(document)

const html = {
        
    links: [...dcmt('.abas-navegacao').children],
    contents: [...dcmt('.area-form').children],
    openTab: dcmt('[data-open]'),
    buttons: [...dcmt('.buttons').children],
    button: [...dcmt('.button').children]
};

function isCPF() {	
    cpf = dcmt('#cpf').value
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11)return false;	
    // Valida 1o digito	
    count = 0;	
    for (i=0; i < 9; i ++)		
        count += parseInt(cpf.charAt(i)) * (10 - i);	
        dig = 11 - (count % 11);	
        if (dig == 10 || dig == 11)		
            dig = 0;	
        if (dig != parseInt(cpf.charAt(9)))		
            return false;		
    // Valida 2o digito	
    count = 0;	
    for (i = 0; i < 10; i ++)		
        count += parseInt(cpf.charAt(i)) * (11 - i);	
    dig = 11 - (count % 11);	
    if (dig == 10 || dig == 11)	
        dig = 0;	
    if (dig != parseInt(cpf.charAt(10)))
        return false;		
    return true; 
};

// valida name usuario
function validaNome (){
    nome = dcmt('#name').value
    if(nome == ''){
        alert("Digite seu nome")
        nome.focus()
    }
    localStorage.setItem('nome', nome)
    validaData()
    if (isCPF() == true){
        localStorage.setItem('cpf', cpf)
        showActiveContent('endereco')
    }else
    alert('CPF inválido');
    cpf.focus()
};


function validaData(){
    const dataNasc = dcmt('#date').value
    if (dataNasc == ''){
        alert('Digite sua data de nascimento')
        dataNasc.focus()
    }
    localStorage.setItem('dtNasc', dataNasc)

};

//function AbasNavegation (){

 //função para ocultar o conteúdo das abas
            function hideContent (){
                
                html.contents.forEach(section => {
                    section.style.display = 'none'
                })
            };

            //Remove o conteúdo de uma aba quando outra estiver selecionada 
            function removeActivesTabs(){
                html.links.forEach(abas =>{
                    abas.className = abas.className.replace("active" , "");
                })
            };

            //Mostra o  conteúdo que está ativo 
            function showActiveContent(id){
                hideContent()

                const abaContent = dcmt('#' + id)
                abaContent.style.display = "block"

                id.className+="active";

            };

        // Ouve qual aba foi selecionada
        function abaSelecionada(event){
            
            removeActivesTabs()
            
            const target = event.currentTarget
            showActiveContent(target.dataset.id)

            target.className += " active"

        }

        // Irá "ouvir" os eventos que estão ocorrendo entre as abas
            function verificaEventos(){
                html.links.forEach(aba => {
                    aba.addEventListener('click', abaSelecionada)
                })

                html.buttons.forEach(click => {
                        click.addEventListener('click', abaSelecionada)
                })

        };

        // consulta p cep na api dos correios
        function consultCEP(){
            const cep = dcmt("#cep").value;
            //valida o cep
            if(cep.length != 8 || cep === ""){
                console.log('CEP inválido')
            }else
    
            //pega o json recebido pela API viacep e altera os valores do input
            var url = `https://viacep.com.br/ws/${cep}/json/`;

            $.getJSON(url, function(data){
                $("#rua").val(data.logradouro);
                $("#bairro").val(data.bairro);
                $("#city").val(data.localidade);
    
                //converte o JSON para objeto
                fetch(url).then(function(response){
                    response.json().then(function(data){
                        showResult(data);
                    })
                })
            })
        }

        // mostra o resultado inseridos na primeira aba 

        function show(){
            html.final.innerHTML = `<p><br>Nome: ${localStorage.getItem('nome', nome)}<\p><br>
                                    <p>Data de Nascimento: ${localStorage.getItem('dtNasc', dtNasc)}<\P><br>
                                    <p>CPF: ${localStorage.getItem('cpf', cpf)}<\p>`
        }

        // motra o resultado com base no json retornado da api

        function showResult(data){
            html.final.innerHTML += `<br><p>${localStorage.getItem('rua', data.logradouro)}<\p><br>
                                    <p>Bairro: ${localStorage.getItem('bairro', data.bairro)}<\p><br>
                                    <p>Cidade: ${localStorage.getItem('cidade', data.localidade)}<\p>`
        }
        
        // Função que iniciará a aplicação
        function startApplication(){
            
            hideContent()
            verificaEventos()   
            localStorage.clear()

            html.openTab.click()

        };
        
        
startApplication()
