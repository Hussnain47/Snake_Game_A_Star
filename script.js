const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");
let size = 15; // snake size
let snake = []; // snake body
let dx = size; // change in x
let dy = 0; // change in y
let board_background = "black"; //board background color for clearing canvas
let board_border = "rgb(80, 80, 80)"; // board border color for fun
let boardcoor = snakeboard.getBoundingClientRect();

// draw a border around the canvas
function clearBoard() {
  //  Select the colour to fill the drawing
  snakeboard_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeboard_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
// Drawing rectangle of snake
function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = "red";
  snakeboard_ctx.strokeStyle = "black";
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, size, size);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, size, size);
}
// Creating snake of size n in xpos,ypos
function createSnake(xpos, ypos, n) {
  snake = [];
  for (let i = 0; i < n; i++) {
    snake.push({ x: xpos + size * i, y: ypos });
  }
}
// drawing each part of snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}
// moving snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}
// Taking input
function input(event) {
  // Keyboard Codes
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const keyPressed = event.keyCode;

  // Changing direction and returning to stop from reversing
  if (keyPressed === LEFT_KEY && dx !== -size && dx !== size) {
    dx = -size;
    dy = 0;
    return;
  }

  if (keyPressed === UP_KEY && dy !== -size && dy !== size) {
    dx = 0;
    dy = -size;
    return;
  }

  if (keyPressed === RIGHT_KEY && dx !== size && dx !== size) {
    dx = size;
    dy = 0;
    return;
  }

  if (keyPressed === DOWN_KEY && dy !== size && dy !== size) {
    dx = 0;
    dy = size;
    return;
  }
}

function gameEnded() {
  for (let i = 0; snake.length; i++) {
    if (
      snake[i].x < boardcoor.left ||
      snake[i].x > boardcoor.right ||
      snake[i].y < boardcoor.top ||
      snake[i].y > boardcoor.bottom
    ) {
      console.log(snake[i].x, snake[i].y);
      return true;
    }
  }
  return false;
}

function main() {
  if (gameEnded()) {
    return;
  }
  setTimeout(function onTick() {
    clearBoard();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

createSnake(200, 200, 4);
document.addEventListener("keydown", input);
main();
