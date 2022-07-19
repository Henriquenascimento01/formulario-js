// Cria um atalho mais curto para não precisar digitar document.querySelector() sempre
const $ = document.querySelector.bind(document)

//Valida o cpf informado pelo usuário
function validarCPF(cpf) {	
    cpf = $('#cpf').value

	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
};


// Validar preenchimento formulário
function validaDadosPreenchidos(){
    
    var userName = $('#name').value
   
if (userName === ''){
    //console.log('O campo NOME é obrigatório')
    alert('O campo NOME é obrigatório');
        }

    localStorage.setItem('nome', userName) 
    validaDataNasc()

if (validarCPF() == true ){
        localStorage.setItem('cpf', cpfInformado)
        showActiveContent('endereco')
        
}

    else 
        alert('CPF invalido')
       
            
}






function validaDataNasc(){
    const dataNasc = $('#date').value;

    if (dataNasc === '') {
        //console.log('O campo data de nascimento é obrigatório')
        alert('A data de nascimento é obrigatória')
        
         
        
    }

    localStorage.setItem('dataNasc', dataNasc)
};

cpf.focus();

// const html = {
        
//     links: [...$('.abas-navegacao').children],
//     contents: [...$('.area-form').children],
//     openTab: $('[data-open]'),
//     buttons: [...$('.buttons').children],
//     button: [...$('.button').children]
// };
    

// funçoes referentes as abas de navegação ( usada para dar contexto do que está sendo tratado )
function AbasNavegation (){

        // Cria um objeto que pega as informações do DOM

    const html = {
        
        links: [...$('.abas-navegacao').children],
        contents: [...$('.area-form').children],
        openTab: $('[data-open]'),
        buttons: [...$('.buttons').children],
        button: [...$('.button').children]
    };
        
                //função para ocultar o conteúdo das abas
            function hideContent (){
                
                html.contents.forEach(section => {
                    section.style.display = 'none'
                })
            };

            //Remove o conteúdo de uma aba quando outra estiver selecionada 
            function removeActivesTabs(){
                console.log('remove tabs')
            };

            //Mostra o  conteúdo que está ativo 
            function showActiveContent(id){
                const abacontent = $('#' + id)
                abacontent.style.display = "block"

            };

        // Ouve qual aba foi selecionada
        function abaSelecionada(event){
            
            hideContent()
            
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

                html.button.forEach(click => {
                click.addEventListener('click', abaSelecionada)
        })
            

        };

        // Função que iniciará a aplicação
        function startApplication(){
            
            hideContent()
            verificaEventos()

            html.openTab.click()

        };
        
        return {
           startApplication

        }
    }

// Será executada quando a tela carregar 

 window.addEventListener('load', () => {
    
      const abasNavegation = AbasNavegation()
      abasNavegation.startApplication()
  });

