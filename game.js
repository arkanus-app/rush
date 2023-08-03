//Gerador do Card do Menu Inicial
function makecard(titulo,tipo,descricao,imagem,id) {
var newcard = '' + 
' <div class="col d-flex">' + 
`                <div class="card border-0 shadow-lg"><img class="img-fluid card-img-top w-100 d-block fit-cover" style="height: 200px;" src="${imagem ?? "https://quir.arkanus.app/assets/img/Leonardo_Diffusion_Picture_a_retroinspired_garage_workshop_fi_0-transformed.webp"}">` + 
'                    <div class="card-body d-table-row p-4">' + 
`                        <p class="text-primary card-text mb-0">${tipo}&nbsp;</p>` + 
`                        <h4 class="card-title">${titulo}</h4>` + 
`                        <p class="card-text">${descricao}</p>` + 
`                        <div class="d-inline float-end"><button onclick="iniciar(${id});" class="btn btn-primary d-flex flex-grow-1 justify-content-xxl-center align-items-xxl-center mt-2" type="button" >Começar</button></div>` + 
'                    </div>' + 
'                </div>' + 
'            </div>' + 
''; 
return newcard;
}
var lista = document.getElementById("lista");
var cards = fetch("https://raw.githubusercontent.com/arkanus-app/rush/main/menu.json")
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        lista.innerHTML += makecard(element.name,element.type,element.description,element.image,element.id);
    });
});
//Fim do Gerador do Card Inicial






//Funções de Ocultar e Mostrar Partes do Jogo
function ocultarSeletor() {
document.getElementById("seletor").style.display = "none";
}

function mostrarSeletor() {
document.getElementById("seletor").style.display = "block";
}

function ocultarGame() {
document.getElementById("game").style.display = "none";
}

function mostrarGame() {
document.getElementById("game").style.display = "block";
}

function TelaErro(mensagem) {
    const error_balao = document.getElementById("erro")
    const error_texto = document.getElementById("erro-text")
    error_texto.innerHTML = mensagem
    error_balao.style.display = "block"
    const error_button = document.getElementById("erro-btn")
    error_button.addEventListener("click", () => {
        error_balao.style.display = "none"
        mostrarSeletor()
    }
    )
    setTimeout(() => {
        error_balao.style.display = "none"
        mostrarSeletor()
    }
    , 5000)
}


//Menu Seletor de Banco de Questões
function iniciar(id) {
var questions = fetch(`https://raw.githubusercontent.com/arkanus-app/rush/main/obj/${id}.json`)
.then(response => response.json())
.then(data => {
        questoes = data;
        StartGame(questoes);
    }).catch(error => {
        console.error(error)
        ocultarSeletor();
        TelaErro("Erro ao carregar o jogo, tente novamente mais tarde.")
    })
}
//Fim do Menu Seletor de Banco de Questões


//Função de Iniciar o Jogo
function StartGame(questions) {
    ocultarSeletor();
    mostrarGame();
    //selecione uma questão aleatoria
    var questao = questions[Math.floor(Math.random() * questions.length)];
    questao_atual = questions.indexOf(questao);
    relogio = true
    makeQuestion(questao)
    Temporizador()
}

//Fim da Função de Iniciar o Jogo
function makeQuestion(question) {
console.log(question)
var p_text = document.getElementById("q-text")
p_text.innerHTML = question.pergunta
var img = document.getElementById("q-img")
if (question.imagem) {
    img.src = question.imagem
    img.style.display = "block"
} else {
    img.style.display = "none"
}


//para cada alternativa execute a função makeAlternative
var alternativas = '';
const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','Q','R','S','T','U','V','W','X','Y','Z']
//crie uma alternativa com o texto e o numero da alternativa
for (let index = 0; index < question.opcoes.length; index++) {
    alternativas += makeAlternative(alfabeto[index],question.opcoes[index])
}

function makeAlternative(alternative,text) {
    var alternativa = '' + 
    '<div class="row borda-fofa m-1">' + 
    `                    <div class="col-md-1 col-lg-1 d-md-flex justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center"><button onclick="resposta('${alternative}');"class="btn btn-primary" type="button"><strong>${alternative}</strong></button></div>` + 
    '                    <div class="col-md-11 align-items-center align-content-center mt-3">' + 
    '                        <div class="text-break d-flex p-1">' + 
    `                            <p class="justify-content-md-center align-items-md-center">${text}</p>` + 
    '                        </div>' + 
    '                    </div>' + 
    '                </div>' + 
    '';
    return alternativa;
}
const p_alternativas = document.getElementById("p-alternativas")
p_alternativas.innerHTML = alternativas
//alternativa atual representa a posição de qual letra no alfabeto?
alternativa_atual = question.alternativa

}

function resposta(alternativa) {
        if (alternativa_atual ==   alternativa) {
            historico.push('acerto')
            console.log('acerto')
            StartGame(questoes)
            relogio = false
        } else {
            historico.push('erro')
            console.log('erro')
            StartGame(questoes)
            relogio = false
        }
    }



//Carregamento Inicial
ocultarGame();
mostrarSeletor();
var relogio = false
var historico = [];
var questoes = [];
var tempo_inicial = 1;
var quantidade = 5
var questao_atual = 0;
var alternativa_atual = "";
var timer = null
function Temporizador() {
    if (timer) {
        clearInterval(timer)
    }
    const clock = document.getElementById("clock-text")
    const clock_bar = document.getElementById("clock")
    tempo = tempo_inicial * 60
    minutos = Math.floor(tempo / 60)
    segundos = tempo % 60

    timer = setInterval(() => {
        if (segundos == 0) {
            minutos--
            segundos = 59
        } else {
            segundos--
        }
        clock.innerHTML = `${minutos}:${segundos}`
        //defina a porcentagem da barra de progresso de acordo com o tempo restante
        //tempo restante em porcentagem do tempo inicial
        var porcentagem = (minutos * 60 + segundos / (tempo_inicial * 60)) * 100
        clock_bar.children[0].style.width = porcentagem+"%"
        if (minutos == 0 && segundos == 0) {
            historico.push('Tempo Esgotado') 
            clearInterval(timer)   
            StartGame(questoes)
        }
    }
    , 1000)
    }