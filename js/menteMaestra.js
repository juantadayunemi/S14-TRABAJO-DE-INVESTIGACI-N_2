const colors= ['red', 'blue', 'green', 'yellow', '#12031c', 'orange', 'pink', 'brown'];
let totalPairs  =colors.length;

let backColor= 'gainsboro';
let cards=  []; 
let flippedCards= [];

let matchedPairs= 0;
let isFlipping= false;
let startTime= null; 
let  timerInterval= null;

    function LoadGame() 
    {
        console.log('LoadGame function called');

        var button = document.getElementById('btn-success');

        initializeGame();

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
    
        console.log( flippedCards);

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
        const currentTime = new Date();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        document.getElementById('timer').textContent = `Tiempo= ${elapsedSeconds} segundos`;
    };

