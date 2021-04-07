// VARIABLES

// Start snake position
let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
  {x: 170, y: 200},
  {x: 160, y: 200}
];

// Area elements position
let apple_x;
let apple_y;
let tree_x;
let tree_y;

// Snake movement
let direction_x = 20;
let direction_y = 0;
let change_direction = false;

// Game Stats
let score = 0;
let speed = 100;
let start = false;

// Game Layout
document.getElementById('button').innerHTML = 'START GAME';

const gameArea = document.getElementById("gameArea");

const gameArea_ctx = gameArea.getContext("2d");

// Start Game
document.getElementById("start").addEventListener('click', function(){
  // Reset Stats for Play New Game
  if (start == false) {
    document.getElementById("loseScreen").style.display = "none";
  score = 0;
  document.getElementById('score').innerHTML = score;
  document.getElementById('apple').innerHTML = score/5;
  speed = 100;
  start = true;
  document.getElementById('button').innerHTML = 'IN GAME';
  direction_x = 20;
  direction_y = 0;
  snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
  ];
  // PLAY GAME
  game();
  genNewApple();
  document.addEventListener("keydown", changing_direction);
  }
});

//------------------------------------------------------------------------------
// FUNCTIONS

// Main
function game() {
  if (endGame()) {
    document.getElementById('points').innerHTML = score;
    document.getElementById('appleEated').innerHTML = score/5;
    start = false;
    document.getElementById('button').innerHTML = 'START GAME';
    document.getElementById("loseScreen").style.display = "block";
    return;
  }
  setTimeout(() => {
    createGameArea();
    if(start == true) {
      move_snake();
    }

    // Draw the Game Elements
    createSnake();
    createApple();
    createTree_and_Bush();

    // Repeat all
    game();
  }, speed - (score/3));
}

// Element Generator
function createTree_and_Bush() {
  //Bush generator
  var bush = new Image();
  bush.src = 'img/bush.png';
  gameArea_ctx.drawImage(bush, 600, 410, 60, 60);
  gameArea_ctx.drawImage(bush, 800, 220, 60, 60);
  gameArea_ctx.drawImage(bush, 100, 500, 60, 60);
  gameArea_ctx.drawImage(bush, 450, 209, 60, 60);
  gameArea_ctx.drawImage(bush, 900, 203, 60, 60);
  gameArea_ctx.drawImage(bush, 520, 50, 60, 60);
  gameArea_ctx.drawImage(bush, 100, 250, 60, 60);

  //Tree generator
  var tree = new Image();
  tree.src = 'img/tree.png';
  gameArea_ctx.drawImage(tree, 50, 50, 120, 120);
  gameArea_ctx.drawImage(tree, 70, 360, 120, 120);
  gameArea_ctx.drawImage(tree, 700, 270, 120, 120);
  gameArea_ctx.drawImage(tree, 523, 180, 120, 120);
  gameArea_ctx.drawImage(tree, 196, 203, 120, 120);
  gameArea_ctx.drawImage(tree, 370, 320, 120, 120);
  gameArea_ctx.drawImage(tree, 700, 20, 120, 120);
  gameArea_ctx.drawImage(tree, 770, 50, 120, 120);
}

// Draw Game Area
function createGameArea() {
  var gameAreaBackGround = new Image();
  gameAreaBackGround.src = 'img/gameAreaBackGround.jpg';
  gameArea_ctx.drawImage(gameAreaBackGround, 0, 0, gameArea.width, gameArea.height);
}

// Draw apple
function createApple() {
  var apple = new Image();
  apple.src = 'img/apple.png';
  gameArea_ctx.drawImage(apple, apple_x, apple_y, 20, 20);
}

// Draw snake body
function createSnake() {
  snake.forEach(createSnakePart)
}

// Draw snake section
function createSnakePart(snakePart) {
  // Snake section style
  gameArea_ctx.strokeStyle = '#C1C95A';
  gameArea_ctx.fillStyle = '#82C35F';

  // Draw snake head
  var snakeHead = new Image();
  snakeHead.src = 'img/snakkke.PNG';
  gameArea_ctx.drawImage(snakeHead, snake[0].x -10 , snake[0].y -5, 40, 40);

  // Draw snake section
  gameArea_ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
  gameArea_ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

// End Game exceptions
function endGame() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameArea.width - 20;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameArea.height - 20;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

// Random number generator
function random_apple(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 20) * 20;
}

// Apple generator
function genNewApple() {
  apple_x = random_apple(0, gameArea.width - 20);
  apple_y = random_apple(0, gameArea.height - 20);

  snake.forEach(function has_snake_eaten_apple(part) {
    const has_eaten = part.x == apple_x && part.y == apple_y;
    if (has_eaten) genNewApple();
  });
}

// Snake Controllers

// Direction Controller
function changing_direction(event) {
  const left_key = 37;
  const right_key = 39;
  const up_key = 38;
  const down_key = 40;

  change_direction = true;

  // Direction variables
  const keyPressed = event.keyCode;
  const goingUp = direction_y === -20;
  const goingDown = direction_y === 20;
  const goingRight = direction_x === 20;
  const goingLeft = direction_x === -20;

  if (keyPressed === left_key && !goingRight) {
    direction_x = -20;
    direction_y = 0;
  }
  if (keyPressed === up_key && !goingDown) {
    direction_x = 0;
    direction_y = -20;
  }
  if (keyPressed === right_key && !goingLeft) {
    direction_x = 20;
    direction_y = 0;
  }
  if (keyPressed === down_key && !goingUp) {
    direction_x = 0;
    direction_y = 20;
  }
}

// Movement Controller
function move_snake() {
  const head = {
    x: snake[0].x + direction_x,
    y: snake[0].y + direction_y
  };
  snake.unshift(head);
  const has_eaten_apple = (snake[0].x === apple_x && snake[0].y === apple_y);

  // Score Generator
  if (has_eaten_apple) {
    score += 5;
    document.getElementById('score').innerHTML = score;
    document.getElementById('apple').innerHTML = score/5;
    genNewApple();
  } else {
    snake.pop();
  }
}
