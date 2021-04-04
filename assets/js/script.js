var pontuacoes = [];

function loadSplashScreen(){
    var logo =  document.querySelector(".mosquito-animado");
    var splash = document.querySelector(".splash-screen");
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
    let usuario = document.getElementById("nomeUsuario").value;
    pontuacoes.push("{'usuario': "+  usuario +"}");
    
    let idUser = document.getElementById("identificadorUser");
    idUser.value = pontuacoes.length;

    closeModalCadastro();
    loadGame()
}

function loadGame(){
    loadSplashScreen();

    var activieselements = document.getElementsByClassName("active")[0];
    activieselements.classList.remove("active");

    document.getElementById("sessaoGame").classList.add("active");

    voar(500)

}

function closeModalCadastro(){
    let modal = document.getElementById("modalComecar");
    modal.style.display = "none";
}

function voar(velocidade){
    var audio = new Audio('audio/zumbido.mp3');
    audio.addEventListener('canplaythrough', function() {
        audio.play();
    });
    var mosquito = document.getElementById("mosquito");
    
    var voador = setInterval(function(){
        let px = Math.random()*300 + "px";
        let py = Math.random()*300 + "px";

        mosquito.style.top = py;
        mosquito.style.left = px;
        console.log("alou")
    }, velocidade);

    mosquito.setAttribute("onclick", "matar("+voador+")")

}

function matar(paremeter){
    clearInterval(paremeter);
    var mosquito = document.getElementById("mosquito");

    mosquito.style.backgroundImage = "url(img/mancha-vermelha.gif)"
}

window.addEventListener("load", function(){
    
    loadHome();
})
