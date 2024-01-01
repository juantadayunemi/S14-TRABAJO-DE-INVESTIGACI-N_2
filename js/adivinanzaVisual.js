if (!window.animals) {
    const  animals = ['perro', 'gato', 'cardinal', 'elefante', 'leon', 'rana', 'vaca', 'caballo'];
    let remainingAnimals = [];
    let correctGuesses = 0;
    let penaltyAttempts = 3; // Intentos de penalización por error
    let totalTime = 0;
    let isGameActive = false;
    let currentSound = null;
    let consecutiveRepetitions = 0;
    const maxConsecutiveRepetitions = 3; // Número máximo de repeticiones consecutivas permitidas
    let  lastSound= null ;
    let timerInterval = 0;
    let soundInterval  = 0;
}

if (!window.soundInterval){
    let soundInterval;
}

animals = ['perro', 'gato', 'cardinal', 'elefante', 'leon', 'rana', 'vaca', 'caballo']
remainingAnimals = [];
correctGuesses = 0;
penaltyAttempts = 3; // Intentos de penalización por error
totalTime = 0;
isGameActive = false;
currentSound = null;
consecutiveRepetitions = 0;
maxConsecutiveRepetitions = 3; // Número máximo de repeticiones consecutivas permitidas
lastSound= null ;
timerInterval = 0;
soundInterval  = 0;

function LoadGame() {

    initializeGame();


    var button = document.getElementById('btn-success');
    button.addEventListener('click', function () {
        initializeGame();

        startGame();
    });

    clearInterval(timerInterval);
    clearInterval(soundInterval);

    console.log(`ya di stock yama`);
}

function createCard(animal) {
    const card = document.createElement('div');
    card.className = 'card';

    // Crear elemento de imagen
    const image = document.createElement('img');
    image.src = `/img/${animal}.png`; 
    image.alt = animal;

    // Establecer estilos para centrar la imagen, aplicar el padding y limitar el tamaño
    image.style.display = 'block';
    image.style.margin = 'auto';
    image.style.padding = '5px';
    image.style.maxWidth = '100%'; 
    image.style.maxHeight = '100%'; 

    // Agregar evento de clic a la tarjeta
    card.addEventListener('click', () => onCardClick(animal, card));

    // Agregar la imagen a la tarjeta
    card.appendChild(image);

    return card;
}

function initializeGame() {
    

    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    correctGuesses = 0;
    penaltyAttempts =3;
    remainingAnimals = [...animals]; // Duplica la lista de animales
    shuffleArray(remainingAnimals);


    const shuffledAnimals = [...animals];
    shuffleArray(shuffledAnimals);

    shuffledAnimals.forEach(animal => {
        const card = createCard(animal);
        gameContainer.appendChild(card);
    });


}

function startGame() {

    isGameActive = true;
    consecutiveRepetitions = 0;

    const shuffledSounds = [...animals];
    shuffleArray(shuffledSounds);

    remainingAnimals = shuffledSounds;
    playRandomSound();
    resetTimer();
    
}

function playRandomSound() {
    currentSound = remainingAnimals[0];
    playSound(currentSound);
}


function onCardClick(animal, card) {

    console.log(animal);

    if (!isGameActive || card.classList.contains('guessed')) {
        return;
    }


    if (animal === currentSound) {

        correctGuesses++;
        card.classList.add('correct-guess');
        card.classList.add('guessed');
        consecutiveRepetitions = 0;

        if (correctGuesses === animals.length) {

            playSound('applause-sound');
            stopGame();

            const currentTime = new Date();
            totalTime = Math.floor((currentTime - startTime) / 1000);

            document.getElementById('timer').textContent = `¡Has acertado todos los animales en ${totalTime} segundos con ${penaltyAttempts} intentos restantes!`;

            // Agregar la clase 'ganador' para iniciar la animación
            document.getElementById('timer').classList.add('ganador');

            // Reiniciar la animación después de un tiempo (por ejemplo, 2 segundos)
            setTimeout(() => {
                document.getElementById('timer').classList.remove('ganador');
            }, 2000);

        } else {
            remainingAnimals.shift(); // Elimina el animal actual de la lista
            playRandomSound();
        }
    } else {
  
        card.classList.add('wrong-guess');
        penaltyAttempts--;

        if (penaltyAttempts === 0) {
            playSound('error-sound');
            stopGame();
            document.getElementById('timer').textContent = `¡Has agotado tus intentos! Perdiste, Juego terminado.`;

        } else {
            consecutiveRepetitions++;

            if (consecutiveRepetitions === maxConsecutiveRepetitions) {
                playSound('error-sound');
                stopGame();
                document.getElementById('timer').textContent = `¡Has perdido el juego por no hacer clic en ninguna tarjeta después de tres repeticiones! Juego terminado`;

            } else {
                setTimeout(playRandomSound, 1000); // Espera 1 segundo antes de reproducir el mismo sonido nuevamente
            }
        }
    }

}


function stopGame() {
    isGameActive = false;
    clearInterval(timerInterval);
    clearInterval(soundInterval);
}

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
        if (isGameActive) {
            const currentTime = new Date();
            totalTime = Math.floor((currentTime - startTime) / 1000);
            document.getElementById('timer').textContent = `Tiempo: ${totalTime} segundos`;
        }
    }, 1000);

    soundInterval = setInterval(() => {
        if (isGameActive) {
            playSound(currentSound)
        }
    }, 3000);
}


function resetTimer() {
    startTimer();
    document.getElementById('timer').textContent = 'Tiempo: 0 segundos';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function playSound(soundId) {
 
    if (lastSound === soundId && penaltyAttempts  === 3 ) {
        consecutiveRepetitions++;
        
        if (consecutiveRepetitions === maxConsecutiveRepetitions) {
            playSound('error-sound');
            stopGame();
            const endTime = new Date();
            const elapsedSeconds = Math.floor((endTime - startTime) / 1000);

            document.getElementById('timer').textContent = `¡Has perdido en ${elapsedSeconds} segundos!`;
        }

    } else {
        consecutiveRepetitions = 0; 
    }

    const sound = document.getElementById(soundId);
    if (sound) {
        sound.play();
    }
 
    lastSound = soundId;
}

