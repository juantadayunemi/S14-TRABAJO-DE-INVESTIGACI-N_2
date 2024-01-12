if (!window.grid) {
  let startButton = document.getElementById("start-button");
  let container = document.querySelector(".ola");
  let coverScreen = document.querySelector(".cover-screen");
  let result = document.getElementById("result");
  let overText = document.getElementById("over-text");
  let grid = document.querySelector(".cuadro")
  let matrix,
    score,
    isSwiped,
    touchY,
    initialY = 0,
    touchX,
    initialX = 0,
    rows = 4,
    columns = 4,
    swipeDirection;

  let rectLeft = grid.getBoundingClientRect().left;
  let rectTop = grid.getBoundingClientRect().top;
  let getXY = null
  let adjacentCheck = null
  let createGrid = null
  let possibleMovesCheck = null
  let randomPosition = null
  let hasEmptyBox = null
  let gameOverCheck = null
  let generateTwo = null
  let generateFour= null
  let removeZero= null
  let checker= null
  let slideDown= null
  let slideUp= null
  let slideRight= null
  let slideLeft= null
  let startGame= null
}

grid = document.querySelector(".cuadro");
startButton = document.getElementById("start-button");
container = document.querySelector(".ola");
coverScreen = document.querySelector(".cover-screen");
result = document.getElementById("result");
overText = document.getElementById("over-text");

matrix = [],
  score = 0,
  isSwiped = 0,
  touchY = 0,
  initialY = 0,
  touchX = 0,
  initialX = 0,
  rows = 4,
  columns = 4,
  swipeDirection = 0

rectLeft = grid.getBoundingClientRect().left;
rectTop = grid.getBoundingClientRect().top;

getXY = (e) => {
  touchX = e.touches[0].pageX - rectLeft;
  touchY = e.touches[0].pageY - rectTop;
};

createGrid = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const boxDiv = document.createElement("div");
      boxDiv.classList.add("box");
      boxDiv.setAttribute("data-position", `${i}_${j}`);
      grid.appendChild(boxDiv);
    }
  }
};

adjacentCheck = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) {
      return true;
    }
  }
  return false;
};

possibleMovesCheck = () => {
  for (let i in matrix) {
    if (adjacentCheck(matrix[i])) {
      return true;
    }
    let colarr = [];
    for (let j = 0; j < columns; j++) {
      colarr.push(matrix[i][j]);
    }
    if (adjacentCheck(colarr)) {
      return true;
    }
  }
  return false;
};

randomPosition = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

hasEmptyBox = () => {
  for (let r in matrix) {
    for (let c in matrix[r]) {
      if (matrix[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
};

gameOverCheck = () => {
  if (!possibleMovesCheck()) {
    coverScreen.classList.remove("hide");
    container.classList.add("hide");
    overText.classList.remove("hide");
    result.innerText = `Final score: ${score}`;
    startButton.innerText = "Restart Game";
  }
};

generateTwo = () => {
  if (hasEmptyBox()) {
    let randomRow = randomPosition(matrix);
    let randomCol = randomPosition(matrix[randomPosition(matrix)]);
    if (matrix[randomRow][randomCol] == 0) {
      matrix[randomRow][randomCol] = 2;
      let element = document.querySelector(
        `[data-position = '${randomRow}_${randomCol}']`
      );
      element.innerHTML = 2;
      element.classList.add("box-2");
    } else {
      generateTwo();
    }
  } else {
    gameOverCheck();
  }
};

generateFour = () => {
  if (hasEmptyBox()) {
    let randomRow = randomPosition(matrix);
    let randomCol = randomPosition(matrix[randomPosition(matrix)]);
    if (matrix[randomRow][randomCol] == 0) {
      matrix[randomRow][randomCol] = 4;
      let element = document.querySelector(
        `[data-position= '${randomRow}_${randomCol}']`
      );
      element.innerHTML = 4;
      element.classList.add("box-4");
    } else {
      generateFour();
    }
  } else {
    gameOverCheck();
  }
};

removeZero = (arr) => arr.filter((num) => num);
checker = (arr, reverseArr = false) => {
  arr = reverseArr ? removeZero(arr).reverse() : removeZero(arr);

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) {
      arr[i] += arr[i + 1];
      arr[i + 1] = 0;
      score += arr[i];
    }
  }

  arr = reverseArr ? removeZero(arr).reverse() : removeZero(arr);

  let missingCount = 4 - arr.length;
  while (missingCount > 0) {
    if (reverseArr) {
      arr.unshift(0);
    } else {
      arr.push(0);
    }
    missingCount -= 1;
  }
  return arr;
};

slideDown = () => {
  for (let i = 0; i < columns; i++) {
    let num = [];
    for (let j = 0; j < rows; j++) {
      num.push(matrix[j][i]);
    }
    num = checker(num, true);
    for (let j = 0; j < rows; j++) {
      matrix[j][i] = num[j];
      let element = document.querySelector(`[data-position='${j}_${i}']`);
      element.innerHTML = matrix[j][i] ? matrix[j][i] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[j][i]}`);
    }
  }

  let decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

slideUp = () => {
  for (let i = 0; i < columns; i++) {
    let num = [];
    for (let j = 0; j < rows; j++) {
      num.push(matrix[j][i]);
    }
    num = checker(num);
    for (let j = 0; j < rows; j++) {
      matrix[j][i] = num[j];
      let element = document.querySelector(`[data-position = '${j}_${i}']`);
      element.innerHTML = matrix[j][i] ? matrix[j][i] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[j][i]}`);
    }
  }
  let decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

slideRight = () => {
  for (let i = 0; i < rows; i++) {
    let num = [];
    for (let j = 0; j < columns; j++) {
      num.push(matrix[i][j]);
    }
    num = checker(num, true);
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = num[j];
      let element = document.querySelector(`[data-position = '${i}_${j}']`);
      element.innerHTML = matrix[i][j] ? matrix[i][j] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[i][j]}`);
    }
  }
  let decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

slideLeft = () => {
  for (let i = 0; i < rows; i++) {
    let num = [];
    for (let j = 0; j < columns; j++) {
      num.push(matrix[i][j]);
    }

    num = checker(num);
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = num[j];
      let element = document.querySelector(`[data-position = '${i}_${j}']`);
      element.innerHTML = matrix[i][j] ? matrix[i][j] : "";
      element.classList.value = "";
      element.classList.add("box", `box-${matrix[i][j]}`);
    }
  }
  let decision = Math.random() > 0.5 ? 1 : 0;
  if (decision) {
    setTimeout(generateFour, 200);
  } else {
    setTimeout(generateTwo, 200);
  }
};

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
  } else if (e.code == "ArrowRight") {
    slideRight();
  } else if (e.code == "ArrowUp") {
    slideUp();
  } else if (e.code == "ArrowDown") {
    slideDown();
  }
  document.getElementById("score").innerText = score;
});

grid.addEventListener("touchstart", (event) => {
  isSwiped = true;
  getXY(event);
  initialX = touchX;
  initialY = touchY;
});

grid.addEventListener("touchmove", (event) => {
  if (isSwiped) {
    getXY(event);
    let diffX = touchX - initialX;
    let diffY = touchY - initialY;
    if (Math.abs(diffY) > Math.abs(diffX)) {
      swipeDirection = diffX > 0 ? "down" : "up";
    } else {
      swipeDirection = diffX > 0 ? "right" : "left";
    }
  }
});

grid.addEventListener("touchend", () => {
  isSwiped = false;
  let swipeCalls = {
    up: slideUp,
    down: slideDown,
    left: slideLeft,
    right: slideRight,
  };
  swipeCalls[swipeDirection]();
  document.getElementById("score").innerText = score;
});

startGame = () => {
  score = 0;
  document.getElementById("score").innerText = score;
  grid.innerHTML = "";
  matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  container.classList.remove("hide");
  coverScreen.classList.add("hide");
  createGrid();
  generateTwo();
  generateTwo();
};
function LoadGame() {
  startButton.addEventListener("click", () => {
    startGame();
    swipeDirection = "";
  });
}
function stopGame(){

}


