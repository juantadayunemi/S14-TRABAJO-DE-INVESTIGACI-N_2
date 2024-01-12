if (!window.color) {
    const  colors= ['red', 'blue', 'green', 'yellow', '#12031c', 'orange', 'pink', 'brown'];
    let totalPairs  =colors.length;
    let backColor= 'gainsboro';
    let cards=  []; 
    let flippedCards= [];
    let matchedPairs= 0;
    let isFlipping= false;
    let timerInterval  = 0;
    let  containerCards  = document.getElementById("card_container");
    let containerGame  = document.getElementById("game_container");
    let otherGameButton  = document.getElementById("otherGameButton");
}

colors= ['red', 'blue', 'green', 'yellow', '#12031c', 'orange', 'pink', 'brown'];
totalPairs  =colors.length;
backColor= 'gainsboro';
cards=  []; 
flippedCards= [];
matchedPairs= 0;
isFlipping= false;
timerInterval  = 0;
containerCards  = document.getElementById("card_container");
containerGame  = document.getElementById("game_container");
otherGameButton  = document.getElementById("otherGameButton");

function LoadGame()  {


    containerCards.classList.add("hide");
    containerGame.classList.remove("hide");

    otherGameButton.addEventListener('click' ,function(){
        containerGame.classList.add("hide");
        containerCards.classList.remove("hide");
    });


        initializeGame();
  
        var button = document.getElementById('btn-success');

        button.addEventListener('click', () => {
            
            initializeGame();

            if (timerInterval) {
                clearInterval(timerInterval);
            }

            timerInterval = setInterval(updateTimer, 1000);
        });
};


shuffleArray= function(array) {
    return array.slice().sort(() => Math.random() - 0.5);
};

function createCard(color) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.color = color;
    card.style.backgroundColor = backColor;
    card.addEventListener('click', () => onCardClick(card));
    return card;
};

function initializeGame () {
    
    cards = shuffleArray([...colors, ...colors]);
    matchedPairs = 0;
    isFlipping = false;
    flippedCards = [];

    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    cards.forEach((color, index) => {
        const card = createCard(color);
        gameContainer.appendChild(card);
    });

    startTime = new Date();

    updateTimer();

    setTimeout(() => {
        cards.forEach((color, index) => {
            const card = gameContainer.children[index];
            card.style.backgroundColor = backColor;
        });
    }, 1000);
};


function stopGame() {
    isGameActive = false;
    clearInterval(timerInterval);
}

function onCardClick(card) {
       
    if (!(timerInterval)) {

        document.getElementById('timer').textContent = `¡Inicia el juego!`;
        // alertar al maximo 
        document.getElementById('timer').classList.add('ganador');

        setTimeout(() => {
            document.getElementById('timer').classList.remove('ganador');
        }, 2000);
        return;
    }

    if (isFlipping || flippedCards.length === 2) {
        return;
    }

    const index = Array.from(card.parentNode.children).indexOf(card);

    if (flippedCards.includes(index)) {
        return;
    }

    card.style.backgroundColor = card.dataset.color; // Mostrar el color real
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        isFlipping = true;
        setTimeout(checkMatch, 500);
    }
};

function checkMatch() {

    if (!Array.isArray(flippedCards) || flippedCards.length !== 2) {
        console.log('Error= No hay dos tarjetas volteadas.');
        return;
    }

    const [index1, index2] = flippedCards;


    const card1 = document.getElementById('game-container').children[index1];
    const card2 = document.getElementById('game-container').children[index2];

    if (card1.dataset.color === card2.dataset.color) {
        // Coincidencia, bloquear las tarjetas
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            const endTime = new Date();
            const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
            document.getElementById('timer').textContent = `¡Has ganado en ${elapsedSeconds} segundos!`;

            if (timerInterval) {
                clearInterval(timerInterval); // Detiene el intervalo al completar el juego
            }

            // Agregar la clase 'ganador' para iniciar la animación
            document.getElementById('timer').classList.add('ganador');

            // Reiniciar la animación después de un tiempo (por ejemplo, 2 segundos)
            setTimeout(() => {
                document.getElementById('timer').classList.remove('ganador');
            }, 2000);
        }
    } else {
        // No hay coincidencia, voltear las tarjetas nuevamente después de 1 segundo
        setTimeout(() => {
            card1.style.backgroundColor = backColor;
            card2.style.backgroundColor = backColor;
            flippedCards = [];
            isFlipping = false;
        }, 100);
    }

    flippedCards = [];
    isFlipping = false;
};
   
function  updateTimer() {
    let currentTime = new Date();
    let elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

    let timer =   document.getElementById('timer') ;
    if (timer)
        timer.textContent =`Tiempo= ${elapsedSeconds} segundos`;
  
};

