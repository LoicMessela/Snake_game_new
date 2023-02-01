const gridElement = document.getElementById("grid");
const startButton = document.getElementById("start-game");
const scoreElement = document.getElementById("score");

const columns = 10;
const rows = 10;
let cells = [];
let score = 0;
let currentPosition = 0;

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
    /*console.log(this.positions, nextPosition, currentPosition);*/
    if (this.positions.includes(nextPosition)) {
      alert("You Lose");

      function endGame() {}
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
    //console.log(`snakeposition:${snake.positions}`)
    //console.log(`currentPosition: ${currentPosition}`)

    if (cells[currentPosition].classList.contains("food")) {
      createFood(1);
      snake.positions.unshift(currentPosition);
      score += 10;
      this.displayScore();
      console.log(score);
    }
  },
  displayScore() {
    scoreElement.textContent = score;
    //newScore.textContent = score
  },
};

function createTheGrid() {
  for (let i = 0; i < columns * rows; i++) {
    createCell();
  }
}

function createCell() {
  const div = document.createElement("div");
  div.classList.add("cell");
  gridElement.append(div);
  cells.push(div);
}

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

function displaySnake(shouldHide) {
  snake.positions.forEach((position) => {
    cells[position].classList[shouldHide ? "remove" : "add"]("snake");
  });
}

function startTheGame() {
  score = 0;
  gridElement.innerHTML = "";
  cells = [];
  currentPosition = 0;
  createTheGrid();
  displaySnake();
  displayScore();
  snake.positions;
  createFood(1);
}
//let theInterval;
function refresh() {
  setInterval(() => {
    displaySnake("hide");
    // snake.move();
    snake.snakeEats();
    displaySnake();
  }, 200);
}

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

startTheGame();
refresh();

startButton.addEventListener("click", () => {
  snake.positions;
  startTheGame();
});

function displayScore() {}
