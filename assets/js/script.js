var pontuacoes = [];
var audio = new Audio('audio/zumbido.mp3');
var velocidade = 300;
var idUser = document.getElementById("identificadorUser").value;
var mosquito = document.getElementById("mosquito");
var logo =  document.querySelector(".mosquito-animado");
var splash = document.querySelector(".splash-screen");
var buttonSair = document.getElementById("buttonSair");

function loadSplashScreen(){
    
    splash.style.display = "flex";
    var loadAnimate = setInterval(function(){
        logo.style.top = logo.style.top == "0px" ? "30px" : 0;
    }, 400);

    setTimeout(
        function(){
            splash.style.display = "none";
            clearInterval(loadAnimate)
        }, 3000
    )
}

function loadHome(){
    loadSplashScreen();

    document.getElementById("sessaoHome").classList.add("active");

    var logo =  document.querySelector(".mosquito-animado-home");
    setInterval(function(){
        logo.style.top = logo.style.top == "0px" ? "30px" : 0;
    }, 400);
}

function loadModalCadastro(){
    let modal = document.getElementById("modalComecar");
    modal.style.display = "block";
}

function cadastrar(){
    let usuarioName = document.getElementById("nomeUsuario").value;

    let usuario = {
        usuarioName: usuarioName,
        usuarioPontos : 0
    }

    pontuacoes.push(usuario);

    idUser = pontuacoes.length - 1;

    closeModalCadastro();
    loadGame()
}

function loadGame(){
    loadSplashScreen();

    var activieselements = document.getElementsByClassName("active")[0];
    activieselements.classList.remove("active");

    document.getElementById("sessaoGame").classList.add("active");

    nextLevel()
}

function nextLevel(condition=false){
    let nomeusaurio = document.querySelector("li#usuarioName span");
    let pontosusaurio = document.querySelector("li#usuarioPontos span");

    nomeusaurio.innerHTML = pontuacoes[idUser].usuarioName;
    pontosusaurio.innerHTML = pontuacoes[idUser].usuarioPontos;

    setTimeout(function(){
        voar(velocidade, condition)
    }, 2000);
}

function closeModalCadastro(){
    let modal = document.getElementById("modalComecar");
    modal.style.display = "none";
}

function voar(velocidade, reset=false){
    
    if(reset == true){
        mosquito.style.top = 0;
        mosquito.style.left = 0;
        mosquito.classList.remove("morto");
    }

    audio.loop = "true";
    audio.play();

    var voador = setInterval(function(){
        let px = Math.random()*320 + "px";
        let py = Math.random()*491 + "px";

        mosquito.style.top = py;
        mosquito.style.left = px;
        console.log("alou")
    }, velocidade);

    mosquito.setAttribute("onclick", "matar("+voador+")");
    buttonSair.setAttribute("onclick", "sairGame("+voador+")")
}   

function matar(paremeter, sair = false){
    mosquito.removeAttribute("onclick");

    audio.pause();

    clearInterval(paremeter);

    if(sair == false){
        mosquito.classList.add("morto");
        pontuacoes[idUser].usuarioPontos += 200;
        nextLevel(true);
    }
    
}

function sairGame(paremeter){
    matar(paremeter, true);

    var modalSair = document.getElementById("modalSair");

    modalSair.style.display = "block";
}

window.addEventListener("load", function(){
    loadHome();
})
