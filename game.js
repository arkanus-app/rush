//Importar & Editar Configurações do Jogod
//config_sound
//config_time
//config_reset
//config_clear

//Declaração de Sons
var acertoAudio = new Audio("assets/audio/correct.mp3");
var erroAudio = new Audio("assets/audio/wrong.mp3");
var startAudio = new Audio("assets/audio/start.mp3");

function PlayAudio(audio, volume) {
    if (config_sound == "on") {
    audio.volume = volume
    audio.play()
    audio.currentTime = 0
    
}}

//Configurações
{
var config_theme = localStorage.getItem("config_theme");
if (config_theme == null) {
    config_theme = "light";
    localStorage.setItem("config_theme", config_theme);
}
updateTheme(config_theme);
const tema_menu = document.getElementById("config_theme")
tema_menu.value = config_theme
//adicione um evento de click para o botão de mudar o tema
tema_menu.addEventListener("change", () => { //quando o botão for clicado execute a função
    localStorage.setItem("config_theme", tema_menu.value);
    updateTheme(tema_menu.value);
    config_theme = tema_menu.value;
    console.log("Tema Atualizado:" + config_theme)
})

//Atualize o tema do jogo
function updateTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    }

//Configurar Musicas
var config_music = localStorage.getItem("config_music");
const music_menu = document.getElementById("config_music")
if (config_music == null) {
    config_music = "on";
    localStorage.setItem("config_sound", config_music);
}
music_menu.value = config_music
music_menu.addEventListener("change", () => { //quando o botão for clicado execute a função
    localStorage.setItem("config_music", music_menu.value);
    config_music = music_menu.value;
    console.log("Musica Atualizada:" + config_music)
})

//configurar efeitos sonoros
var config_sound = localStorage.getItem("config_sound");
const sound_menu = document.getElementById("config_sound")
if (config_sound == null) {
    config_sound = "on";
    localStorage.setItem("config_sound", config_sound);
}
sound_menu.value = config_sound
sound_menu.addEventListener("change", () => { //quando o botão for clicado execute a função
    localStorage.setItem("config_sound", sound_menu.value);
    config_sound = sound_menu.value;
    console.log("Som Atualizado:" + config_sound)
})



}




//Configuração do tempo
var config_time = localStorage.getItem("config_time");
const time_menu = document.getElementById("config_time")
if (config_time == null) {
    config_time = 1;
    localStorage.setItem("config_time", config_time);
}
time_menu.value = config_time
tempo_inicial = config_time
time_menu.addEventListener("change", () => { //quando o botão for clicado execute a função
    localStorage.setItem("config_time", time_menu.value);
    config_time = time_menu.value;
    tempo_inicial = config_time
})


// Nivel
var config_nivel = localStorage.getItem("difficulty");
const nivel_menu = document.getElementById("config_nivel")
if (config_nivel == null) {
    config_nivel = 5;
    localStorage.setItem("config_nivel", config_nivel);
}
nivel_menu.value = config_nivel
nivel_menu.addEventListener("change", () => { //quando o botão for clicado execute a função
    localStorage.setItem("difficulty", nivel_menu.value);
    config_nivel = nivel_menu.value;
})




//Gerador do Card do Menu Inicial
function makecard(titulo,tipo,descricao,imagem,id, link) {
var newcard = '' + 
' <div class="col d-flex">' + 
`                <div class="card border-0 shadow-lg"><img class="img-fluid card-img-top w-100 d-block fit-cover" style="height: 200px;" src="${imagem ?? "https://quir.arkanus.app/assets/img/Leonardo_Diffusion_Picture_a_retroinspired_garage_workshop_fi_0-transformed.webp"}">` + 
'                    <div class="card-body d-table-row p-4">' + 
`                        <span class="badge bg-primary" style="margin-left: 0px;">${tipo}</span>` + 
`                        <h4 class="card-title">${titulo}</h4>` + 
`                        <p class="card-text">${descricao}</p>` + 
`                        <div class="d-inline float-end"><button onclick="iniciar('${link}');" class="btn btn-primary d-flex flex-grow-1 justify-content-xxl-center align-items-xxl-center mt-2" type="button" >Começar</button></div>` + 
'                    </div>' + 
'                </div>' + 
'            </div>' + 
''; 
return newcard;
}
var menu_questions = []
var lista = document.getElementById("lista");
var cards = fetch("/menu.json")
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        lista.innerHTML += makecard(element.name,element.type,element.description,element.image,element.id,element.link);
        menu_questions.push({name:element.name,elemente:element.type,description:element.description,img:element.image,id:element.id,link:element.link})
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

//escute o evento de digitação dentro do input search_input
search_input = document.getElementById("search");
search_input.addEventListener("keyup", Search);
//crie uma função para o evento

function Search() {
    // menu_questions contem todas as opções
    //crie um mecanismo de busca 

    var search = search_input.value.toLowerCase();
    var search_result = menu_questions.filter((question) => {
        return question.name.toLowerCase().includes(search);
    }
    );
    //limpe a lista de opções
    lista.innerHTML = "";
    //adicione as opções encontradas
    search_result.forEach(element => {
        lista.innerHTML += makecard(element.name,element.elemente,element.description,element.img,element.id,element.link);
    }
    );
}


//Menu Seletor de Banco de Questões
function iniciar(id) {
PlayAudio(startAudio, 0.8)
var questions = fetch(`${id}`)
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
    $('#level-select').modal('hide')
    ocultarSeletor();
    mostrarGame();
    score()
    //selecione uma questão aleatoria
    var questao = questions[Math.floor(Math.random() * questions.length)];
    questao_atual = questions.indexOf(questao);
    relogio = true
    makeQuestion(questao)
    Temporizador()
}

//Fim da Função de Iniciar o Jogo
function makeQuestion(question) {
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
    '            <div class="col justify-content-between align-self-baseline flex-wrap" id="p-alternativas">' + 
    '                <div class="row row-cols-2 borda-fofa m-1">' + 
    `                    <div class="col-2 col-sm-2 col-md-1 col-lg-1 d-flex d-sm-flex d-md-flex align-items-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-center"><button class="btn btn-outline-primary" onclick="resposta('${alternative}');" type="button"><strong>${alternative}</strong></button></div>` + 
    '                    <div class="col-9 col-md-11 align-items-center align-content-center mt-3">' + 
    '                        <div class="text-break d-flex p-1">' + 
    `                            <p class="justify-content-md-center align-items-md-center">${text}</p>` + 
    '                        </div>' + 
    '                    </div>' + 
    '                </div>' + 
    '            </div>' + 
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
            PlayAudio(acertoAudio, 0.2)
            StartGame(questoes)
            relogio = false
        } else {
            historico.push('erro')
            PlayAudio(erroAudio, 0.2)
            StartGame(questoes)
            relogio = false
        }
        score()
    }



//Carregamento Inicial
ocultarGame();
mostrarSeletor();
var relogio = false
var historico = [];
var questoes = [];
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



const turnoDisplay = document.getElementById("fase")
const acertosDisplay = document.getElementById("displayT")
const errosDisplay = document.getElementById("displayF")

function score() {
    acertos = historico.filter((item) => item == 'acerto').length
    erros = historico.filter((item) => item == 'erro').length
    timeout = historico.filter((item) => item == 'Tempo Esgotado').length
    turno = historico.length
    acertosDisplay.innerHTML = acertos
    errosDisplay.innerHTML = erros
    turnoDisplay.innerHTML = turno+"/"+config_nivel
    //console.log(`Acertos: ${acertos} Erros: ${erros} Tempo Esgotado: ${timeout} Turnos: ${turno}`)
}

