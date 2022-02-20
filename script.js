const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");
let size = 10; // snake size
let snake = []; // snake body
let dx = size; // change in x
let dy = 0; // change in y
let board_background = "black"; //board background color for clearing canvas
let board_border = "rgb(80, 80, 80)"; // board border color for fun
let changing_direction = false;
let food_x;
let food_y;
let score = 0;

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
function drawFood() {
  snakeboard_ctx.fillStyle = "lightgreen";
  snakeboard_ctx.strokestyle = "darkgreen";
  snakeboard_ctx.fillRect(food_x, food_y, size, size);
  snakeboard_ctx.strokeRect(food_x, food_y, size, size);
}
// Creating snake of size n in xpos,ypos
function createSnake(xpos, ypos, n) {
  snake = [];
  for (let i = 0; i < n; i++) {
    snake.unshift({ x: xpos + size * i, y: ypos });
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

  if ((has_eaten_food = snake[0].x === food_x && snake[0].y === food_y)) {
    // Increase score
    score += 10;
    // Display score on screen
    document.getElementById("score").innerHTML = score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}
// Taking input
function input(event) {
  // Keyboard Codes
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const keyPressed = event.keyCode;
  if (changing_direction) {
    return;
  }
  changing_direction = true;
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

  if (keyPressed === RIGHT_KEY && dx !== size && dx !== -size) {
    dx = size;
    dy = 0;
    return;
  }

  if (keyPressed === DOWN_KEY && dy !== size && dy !== -size) {
    dx = 0;
    dy = size;
    return;
  }
}

function gameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  for (let i = 0; i < snake.length; i++) {
    if (
      snake[i].x < 0 ||
      snake[i].x > snakeboard.width ||
      snake[i].y < 0 ||
      snake[i].y > snakeboard.height
    ) {
      return true;
    }
  }
  return false;
}

function random_food(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function has_snake_eaten_food(part) {
  const has_eaten = part.x == food_x && part.y == food_y;
  if (has_eaten) {
    gen_food();
  }
}
function gen_food() {
  food_x = random_food(0, snakeboard.width - size);
  food_y = random_food(0, snakeboard.height - size);
  snake.forEach(has_snake_eaten_food);
}

function main() {
  if (gameEnded()) {
    return;
  }
  changing_direction = false;
  setTimeout(function onTick() {
    clearBoard();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

createSnake(200, 200, 6);
gen_food();
document.addEventListener("keydown", input);
main();

let blocks_per_row = Math.round(snakeboard.width / size);

class GridNode {
  constructor(x, y, left = null, top = null, right = null, down = null) {
    this.x = x;
    this.y = y;
    this.left = left;
    this.top = top;
    this.right = right;
    this.down = down;
    this.distance = 0;
    this.heuristics = 0;
    this.totalDis = 0;
    this.parent = null;
    this.visited = false;
  }
}

class Grid {
  constructor(blocks) {
    this.nodes = [];
    this.grid = [[]];
    for (var i = 0; i < blocks; i++) {
      this.grid[i] = [];
      for (var j = 0; j < blocks; j++) {
        let node = new GridNode(i, j);

        this.grid[i][j] = node;
        console.log(this.grid[i][j]);
        this.nodes.push(node);
      }
    }
  }
  connectNodes() {}
}

let grid = new Grid(blocks_per_row);
