const animals = ['perro', 'gato', 'pájaro', 'elefante', 'león', 'rana', 'vaca', 'caballo'];
let remainingAnimals = [...animals];
let correctGuesses = 0;
let penaltyTime = 10; // Segundos de penalización por error
let totalTime = 0;
let isGameActive = false;
let startTime= null; 
function LoadGame() {

    var button = document.getElementById('btn-success');
    button.addEventListener('click', function(){

        initializeGame();
      });
}

function createCard(animal) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = animal;
    card.addEventListener('click', () => onCardClick(animal, card));
    return card;
}

function initializeGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    remainingAnimals.forEach(animal => {
        const card = createCard(animal);
        gameContainer.appendChild(card);
    });

    startGame();
}


function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

function onCardClick(animal, card) {
    if (!isGameActive || !remainingAnimals.includes(animal)) {
        return;
    }

    if (remainingAnimals.length === animals.length) {
        startTimer();
    }

    playSound('correct-sound');
    correctGuesses++;
    remainingAnimals = remainingAnimals.filter(a => a !== animal);
    card.classList.add('correct-guess');

    if (correctGuesses === animals.length) {
        stopGame();
        alert(`¡Has acertado todos los animales en ${totalTime} segundos!`);
        initializeGame();
    }
}

function startGame() {
    isGameActive = true;
    correctGuesses = 0;
    remainingAnimals = [...animals];
    shuffleArray(remainingAnimals);
    resetTimer();
}

function stopGame() {
    isGameActive = false;
}

function startTimer() {
    startTime = new Date();
    setInterval(() => {
        if (isGameActive) {
            const currentTime = new Date();
            totalTime = Math.floor((currentTime - startTime) / 1000);
            document.getElementById('timer').textContent = `Tiempo: ${totalTime} segundos`;
        }
    }, 1000);
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

