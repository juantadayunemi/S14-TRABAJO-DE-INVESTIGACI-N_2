if (!window.gamePanel) {
  let gamePanel = document.getElementById('game_panel');
  let timerDisplay = document.getElementById('timer');
  let score = 1;
  let isGameActive = false;
  let animationId = null;
  let startTime = null;
  let timerInterval = null;
  let totalTime = 0;
  let fallSpeed = 1; // Factor de velocidad inicial
}
gamePanel = document.getElementById('game_panel');
 timerDisplay = document.getElementById('timer');
 score = 1;
 isGameActive = false;
 animationId = null;
 startTime = null;
 timerInterval = null;
 fallSpeed = 1;

 gamePanel.style.height = '500px';
 gamePanel.style.margin = '60px';

function LoadGame() {
  const button = document.getElementById('btn-success');
  button.addEventListener('click', startGame);
}

function startGame() {
  fallSpeed =0.5;
  resetGame();
  isGameActive = true;
  startTime = new Date();
  startTimer();
  createNumber();
}

function stopGame() {
  isGameActive = false;
  clearInterval(timerInterval);
  cancelAnimationFrame(animationId);
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (isGameActive) {
      const currentTime = new Date();
      totalTime = Math.floor((currentTime - startTime) / 1000);
      timerDisplay.textContent = `Tiempo: ${totalTime} segundos`;
    }
  }, 1000);
}

function createNumber() {
  const number = document.createElement('div');
  number.className = 'number';
  number.textContent = score;
  number.style.top = '0';
  number.style.margin = '5';
  number.style.padding = '5';
  number.style.backgroundColor  = 'red' ;
    number.style.left = `${Math.random() * (gamePanel.offsetWidth - 50)}px`;
  number.addEventListener('click', () => handleNumberClick(number.animationToken));
  const animationToken = { isCancelled: false };
  number.animationToken = animationToken;
  gamePanel.appendChild(number);
  animateNumber(number, animationToken);
}

function animateNumber(number, animationToken) {
  const numberHeight = number.offsetHeight;
  const containerHeight = gamePanel.offsetHeight;
  let isNumberRemoved = false;

  function fall() {

    if (animationToken.isCancelled){
      number  = null;
    }

    if (isGameActive && !isNumberRemoved && !animationToken.isCancelled) {
      const currentTop = parseFloat(number.style.top);
      const newTop = currentTop + fallSpeed;

      if (newTop < containerHeight - numberHeight) {
        number.style.top = `${newTop}px`;
        requestAnimationFrame(fall);
      } else {
        stopGame();
        isNumberRemoved = true;
        clearNumber(number);
        gameOver();
      }
    }
  }

  requestAnimationFrame(fall);
}


function clearNumber(number) {
  if (gamePanel.contains(number)) {
    gamePanel.removeChild(number);
  }
}

function handleNumberClick(animationToken) {
  if (isGameActive) {
    animationToken.isCancelled = true; // Cancela la animación del número
    const clickedNumber = event.target;
    const clickedNumberValue = parseInt(clickedNumber.textContent);

     if (clickedNumberValue === score) {
      score++; //aumenta el numero que se ba imprimir

      fallSpeed += 0.1; // aumenta la velocidaa de caida

      clearNumber(clickedNumber);
      createNumber();
    } else {
      gameOver();
    }
  }
}
function gameOver() {
  timerDisplay.textContent = `¡¡Juego terminado! Puntuación: ${score - 1}`;
}

function resetGame() {
  score = 1;
  totalTime = 0;
  timerDisplay.textContent = 'Tiempo: 0 segundos';
  clearAllNumbers();
}

function clearAllNumbers() {
  const existingNumbers = document.querySelectorAll('.number');
  existingNumbers.forEach((number) => {
    clearNumber(number);
  });
}

