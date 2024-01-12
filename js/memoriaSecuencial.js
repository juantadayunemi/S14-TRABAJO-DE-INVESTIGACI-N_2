if (!window.images) {
    let startTime;
    let timerInterval;
    const images =  ['perro', 'gato', 'cardinal', 'elefante', 'leon', 'rana', 'vaca', 'caballo'];
    const shuffledImages  = null ;
    const shuffledImagesStar  = null;
    let clickedCount= 0;
    let containerCards  = document.getElementById("card_container");
    let containerGame  = document.getElementById("game_container");
    let otherGameButton  = document.getElementById("otherGameButton");
}

images =  ['perro', 'gato', 'cardinal', 'elefante', 'leon', 'rana', 'vaca', 'caballo'];
startTime = 0;
timerInterval = 0;
shuffledImages  = null;
shuffledImagesStar  = null;
clickedCount= 0;
containerCards  = document.getElementById("card_container");
containerGame  = document.getElementById("game_container");
otherGameButton  = document.getElementById("otherGameButton");


function LoadGame() {

    containerCards.classList.add("hide");
    containerGame.classList.remove("hide");

    otherGameButton.addEventListener('click' ,function(){
        containerGame.classList.add("hide");
        containerCards.classList.remove("hide");
    });

    initializeGame();

    var button = document.getElementById('btn-success');
    button.addEventListener('click', function () {
        startGame();
    });
}

function initializeGame(isVisible=false) 
{
    // limpio las tarjetas 
    clearCards();

    //imagenes barajadas al inicio 
    shuffledImagesStar = shuffleArray([...images], 4);

         //copio imagen y genero para vea el usuario 
         shuffledImages  = [...shuffledImagesStar];
         generateCards(isVisible, false);
     
          //barajo y genero de nuevo para que clieke el ujsuario 
          shuffledImages = shuffleArray([...shuffledImagesStar], 4);
         generateCards(false, false);

}

function startGame() 
{
    startTime = new Date();
    clickedCount = 0;

    document.getElementById('timer').textContent = 'Tiempo: 0 segundos';

    //varajea nuemamente ..............
    initializeGame(true);
    
    setTimeout(() => {

        clearCards();

        //genero una copia de las tarjetas volteadas
        var copydata =[...shuffledImages]
    
        //copio la original a la temporal para que imprima
        shuffledImages  = [...shuffledImagesStar]
    
        // Generar tarjetas para la primera fila para simular que tapo las imagenes
        generateCards(false, false);
    
        // nuevamente retormo como estaba impreso, pero tapado
        shuffledImages  =[...copydata]
        generateCards(true, true);
    
        startTimer();
    }, 3000);

}


function clearCards() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
}

function generateCards(visible, onClick) {
    const gameContainer = document.getElementById('game-container');

    shuffledImages.forEach((image, index) => {
        const card = createCard(index + 1, image, visible, onClick);
        gameContainer.appendChild(card);
    });

}

function createCard(order, animal, visible, onClick) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.order = order;
    card.dataset.animal = animal;

    // Crear elemento de imagen
    const image = document.createElement('img');
    image.src = visible ? `/img/${animal}.png` : '/img/varaja_volteada_150.png';
    image.alt = animal;

    // Establecer estilos para centrar la imagen, aplicar el padding y limitar el tamaño
    image.style.display = 'block';
    image.style.margin = 'auto';
    image.style.padding = '5px';
    image.style.maxWidth = '100%';
    image.style.maxHeight = '100%';

    // Agregar evento de clic a la tarjeta solo si está en la segunda fila (visible = false)
    if (onClick) {
        card.addEventListener('click', () => onCardClick(card));
    }

    // Agregar la imagen a la tarjeta
    card.appendChild(image);

    // Crear un elemento adicional para mostrar el texto (orden o error)
    const textElement = document.createElement('div');
    textElement.className = 'card-text';
    card.appendChild(textElement);

    return card;
}

function onCardClick(card) {
    
    if (!timerInterval) {
        return; // Juego no iniciado
    }

    let animal = card.dataset.animal;
    const textElement = card.querySelector('.card-text');

    if (shuffledImagesStar[clickedCount] === animal){
        textElement.textContent = clickedCount + 1;
    } else {
        textElement.textContent = "Error";
    }

    clickedCount++;

    // Esperar a que el usuario haga clic en todas las tarjetas
    if (clickedCount == 4) {
        checkOrder();
    }

}

// Resto del código sigue igual...


function flipCards() {
    const gameContainer = document.getElementById('game-container');
    const cards = gameContainer.getElementsByClassName('card');

    // Voltear las tarjetas
    Array.from(cards).forEach(card => {
        card.textContent = '';
        card.style.backgroundColor = 'transparent';
    });

    // Iniciar el temporizador
    startTimer();
}

function checkOrder() {
    const gameContainer = document.getElementById('game-container');
    const cards = gameContainer.getElementsByClassName('card');
    let hasError = false;

    // Verificar si hay un elemento con la clase 'error' dentro de '.card-text'
    Array.from(cards).forEach(card => {
        const textElement = card.querySelector('.card-text');
        if (textElement.textContent === 'Error') {
            hasError = true;
        }
    });

    // Detener el temporizador
    stopGame();

 
    if (hasError) {
        document.getElementById('timer').textContent = 'Perdiste. Orden incorrecto. Tiempo: ' + getElapsedTime();
        playSound('error-sound');
    } else {
        document.getElementById('timer').textContent = '¡Ganaste! Tiempo: ' + getElapsedTime();
        playSound('applause-sound');
    }

    // Voltear las tarjetas de la primera fila para mostrar cómo era
    flipFirstRow();

}

function flipFirstRow() {
    const gameContainer = document.getElementById('game-container');
    const cards = gameContainer.getElementsByClassName('card');

    // Voltear las tarjetas de la primera fila
    Array.from(cards).forEach((card, index) => {
        const textElement = card.querySelector('.card-text');
        if (index < 4) {
            textElement.textContent = '';
            card.style.backgroundColor = 'transparent';
        }
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        let currentTime = new Date();
        let elapsedTime = Math.floor((currentTime - startTime) / 1000);
        let timer =   document.getElementById('timer') ;
        if (timer)
            timer.textContent = 'Tiempo: ' + elapsedTime + ' segundos';
  
    }, 1000);
}

function stopGame() {
    isGameActive = false;
    clearInterval(timerInterval);
}


function getElapsedTime() {
    const currentTime = new Date();
    return Math.floor((currentTime - startTime) / 1000);
}

function shuffleArray(array, extraction) {

    const copyArray = [...array];

   for (let i = copyArray.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
   }

   return copyArray.slice(0, extraction);
}

function playSound(soundId) {
    var sound = document.getElementById(soundId);
    if (sound) {
        sound.play();
    }
}

