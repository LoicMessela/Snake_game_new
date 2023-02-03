const gridElement = document.getElementById("grid");
const startButton = document.getElementById("start-game");
const scoreElement = document.getElementById("score");

const pauseButton = document.getElementById("pause");
const modal = document.getElementById("dialog");
const resetButton = modal.querySelector("#reset");
const soundGame = document.querySelector("audio");

const columns = 10;
const rows = 10;
let cells = [];
let score = 0;
let currentPosition = 0;
let interval = null;

//Snake movements 

const snake = {
  positions: [(columns * rows) / 2],
  direction: "right",
  move() {
    const snakeHead = snake.positions[snake.positions.length - 1];
    currentPosition = snakeHead;
    let nextPosition;
    switch (snake.direction) {
      case "right":
        let isRightBoundary = (snakeHead + 1) % columns === 0;
        nextPosition = snakeHead + 1;
        if (isRightBoundary) {
          nextPosition -= columns;
          //console.log(snakeHead);
        }
        break;
      case "left":
        let isLeftBoundary = snakeHead % columns === 0;
        nextPosition = snakeHead - 1;
        if (isLeftBoundary) {
          nextPosition += columns;
        }
        break;
      case "up":
        let isUpBoundary = snakeHead < columns;
        nextPosition = snakeHead - columns;
        if (isUpBoundary) {
          nextPosition += columns * rows;
        }
        break;
      case "down":
        let isDownBoundary = snakeHead >= columns * (rows - 1);
        nextPosition = snakeHead + columns;
        if (isDownBoundary) {
          nextPosition -= columns * rows;
        }
        break;
    }

    if (this.positions.includes(nextPosition)) {
      return endGame();
    }

    //console.log(snakeHead)
    this.positions.shift();
    this.positions.push(nextPosition);
  },

  //move based on direction
  changeDirection(newDirection) {
    //Changes snake direction to newDirection.
    this.direction = newDirection;
  },
  snakeEats() {
    if (cells[currentPosition].classList.contains("food")) {
      createFood(1);
      snake.positions.unshift(currentPosition);
      score += 10;
      this.displayScore();
    }
  },
  displayScore() {
    scoreElement.textContent = score;
  },
};

//The function ending the game

function endGame() {
  clearInterval(interval);
  modal.showModal();
}

//The function creating the grid
function createTheGrid() {
  for (let i = 0; i < columns * rows; i++) {
    createCell();
  }
}


//Creating the the various cells of the grid
function createCell() {
  const div = document.createElement("div");
  div.classList.add("cell");
  gridElement.append(div);
  cells.push(div);
}

//Creating the food and make it appear randomly
function createFood(num) {
  const copyCells = [...cells];
  copyCells.splice(currentPosition, 1);
  cells.forEach((cell) => {
    cell.classList.remove("food");
  });
  //console.log(copy)

  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * copyCells.length);
    const randomCell = copyCells[randomIndex];
    copyCells.splice(randomIndex, 1);
    randomCell.classList.add("food");
  }
}

//Hiding the tail of the snake
function displaySnake(shouldHide) {
  snake.positions.forEach((position) => {
    cells[position].classList[shouldHide ? "remove" : "add"]("snake");
  });
}


//Function starting the game
function startTheGame() {
  score = 0;
  gridElement.innerHTML = "";
  cells = [];
  snake.positions = [(columns * rows) / 2];
  currentPosition = 0;
  createTheGrid();
  displaySnake();
  displayScore(0);
  snake.direction = "right";
  createFood(1);
  startButton.disabled = true;
}

function refresh() {
  interval = setInterval(() => {
    displaySnake("hide");
    snake.move();
    snake.snakeEats();
    displaySnake();
  }, 200);
}

//Event listener setting the 

window.addEventListener("keydown", (event) => {
  //console.log(event.code);
  switch (event.code) {
    case "ArrowLeft":
      if (snake.direction !== "right") {
        snake.changeDirection("left");
      }
      break;
    case "ArrowUp":
      if (snake.direction !== "down") {
        snake.changeDirection("up");
      }
      break;
    case "ArrowRight":
      if (snake.direction !== "left") {
        snake.changeDirection("right");
      }
      break;
    case "ArrowDown":
      if (snake.direction !== "up") {
        snake.changeDirection("down");
      }
  }
});


resetButton.addEventListener("click", () => {
  scoreElement.textContent = "0";
  modal.close();
  startTheGame();
  refresh();
});
soundGame.play();
startButton.addEventListener("click", () => {
  snake.positions;
  refresh();
  startTheGame();
});

function displayScore() {}
