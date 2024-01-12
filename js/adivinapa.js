if (!window.inputs) {
    let inputs = document.querySelector(".inputs")
    let resetBtn = document.querySelector(".reset-btn")
    let pistaTag = document.querySelector(".pista span")
    let posibilRestantes = document.querySelector(".posibilidades span")
    let letraEquivocada = document.querySelector(".letrasErroneas span")
    let typingInput = document.querySelector(".typing-input")
    let palabra, maxSuposiciones, letrasCorrectas = [], letrasIncorrectas = []
    let containerCards  = document.getElementById("card_container");
    let containerGame  = document.getElementById("game_container");
    let otherGameButton  = document.getElementById("otherGameButton");
    let listado  =[];

}

containerCards  = document.getElementById("card_container");
otherGameButton  = document.getElementById("otherGameButton");
containerGame  = document.getElementById("game_container");

//Conjunto determinado de palabras para adivinar
listado = [
    {
        palabra: "javascript",
        pista: "Lenguaje con el que se ha escrito este programa"
    },
    {
        palabra: "ventilador",
        pista: "Mueve el aire y da vueltas"
    },
    {
        palabra: "silla",
        pista: "Normalmente está hecho de madera"
    },
    {
        palabra: "twitter",
        pista: "Red social con un pájaro"
    },
    {
        palabra: "whatsapp",
        pista: "Envias mensajes instantaneos desde esta APP"
    },
    
]
function LoadGame(){

    containerCards.classList.add("hide");
    containerGame.classList.remove("hide");

    otherGameButton.addEventListener('click' ,function(){
        containerGame.classList.add("hide");
        containerCards.classList.remove("hide");

    });
}
function stopGame(){

}

// Contantes que devuelven el primer elemento que coincide con el grupo especificado
 inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    pistaTag = document.querySelector(".pista span"),
    posibilRestantes = document.querySelector(".posibilidades span"),
    letraEquivocada = document.querySelector(".letrasErroneas span"),
    typingInput = document.querySelector(".typing-input");


// Selección aleatoria de la palabra a adivinar
function palabraAleatoria() {
   
    // Definimos para conseguir un item aleatorio
    let itemAleatorio = listado[Math.floor(Math.random() * listado.length)];
   
    palabra = itemAleatorio.palabra;
    maxSuposiciones = palabra.length >= 5 ? 8 : 6;
    letrasCorrectas = []; letrasIncorrectas = [];
    pistaTag.innerText = itemAleatorio.pista;
    posibilRestantes.innerText = maxSuposiciones;
    letraEquivocada.innerText = letrasIncorrectas;

    // Cuadrados para escribir el texto
    let html = "";
    for (let i = 0; i < palabra.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
palabraAleatoria();

// Inicio del juego

function initGame(e) {
    //Convertimos a minúsculas el valor
    let key = e.target.value.toLowerCase();
    // Hacemos que se escriban solo letras y comparamos si son correctas o incorrectas
    if (key.match(/^[A-Za-z]+$/) && !letrasIncorrectas.includes(` ${key}`) && !letrasCorrectas.includes(key)) {
        // Letras correctas
        if (palabra.includes(key)) {
            for (let i = 0; i < palabra.length; i++) {
                if (palabra[i] == key) {
                    letrasCorrectas += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            // Letras incorrectas
            maxSuposiciones--;
            letrasIncorrectas.push(` ${key}`);
        }
        posibilRestantes.innerText = maxSuposiciones;
        letraEquivocada.innerText = letrasIncorrectas;
    }
    typingInput.value = "";

    // Resultados posibles

    setTimeout(() => {
        if (letrasCorrectas.length === palabra.length) {
            //Generamos una respuesta aleatoria para el ganador
            var meng = Math.floor(Math.random() * 5);
            if (meng == 0) {
                alert(`Enhorabuena! Encontraste la palabra ${palabra.toUpperCase()}. Has ganado, ganaste una galletita`);
            } else if (meng == 1) {
                alert(`Enhorabuena! Encontraste la palabra ${palabra.toUpperCase()}. Ganaste a la perfección de lo esperado`);
            } else if (meng == 2) {
                alert(`Enhorabuena! Encontraste la palabra ${palabra.toUpperCase()}. ¿Comiste una enciclopedia?, acertaste la palabra`);
            } else if (meng == 3) {
                alert(`Enhorabuena! Encontraste la palabra ${palabra.toUpperCase()}. Este juego no tiene secretos para ti`);
            } else if (meng == 4) {
                alert(`Enhorabuena! Encontraste la palabra ${palabra.toUpperCase()}. ESTÁS DEMOLIENDO EL JUEGOOOO!!`);
            } else {
                alert(`Enhorabuena! Encontraste la palabra ${palabra.toUpperCase()}. Venciste la batalla, pero no la guerra =.=`);
            }
            // Volvemos a seleccionar una palabra de la lista
            return palabraAleatoria();
        } else if (maxSuposiciones < 1) {
            var menp = Math.floor(Math.random() * 5);
            if (menp == 0) {
                alert("Lastimosamente perdiste...");
            } else if (menp == 1) {
                alert("Perdiste!!!. Deberías dedicar tu tiempo a estudair más seguido");
            } else if (menp == 2) {
                alert("Derrotado... Las adivinanzas no son lo tuyo!!!");
            } else if (menp == 3) {
                alert("Has fallado... prueba leyendo libros para informarte");
            } else if (menp == 4) {
                alert("Has fallado... por no leer bien la pista!!! ");
            } else {
                alert("Has fallado... no pudiste ganar galletas de victoria!!!")
            }

            for (let i = 0; i < palabra.length; i++) {
                // Mostramos la palabra oculta
                inputs.querySelectorAll("input")[i].value = palabra[i];
            }
        }
    }, 100);
}

// Llamadas

typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
resetBtn.addEventListener("click", palabraAleatoria);
