function setup() {
  createCanvas(800, 600);
  gameBall = new Ball(width / 2, height / 2, 5, 5, 10);
  rightPaddle = new Paddle(width - 10 - Paddle.WIDTH, height / 2);
  leftPaddle = new Paddle(10, height / 2);
}

function draw() {
  background(0);
  gameBall.draw();
  gameBall.move();

  rightPaddle.draw();
  leftPaddle.draw();

  // Ball collision with left paddle
  if (
    gameBall.x <= leftPaddle.x + Paddle.WIDTH &&
    gameBall.y >= leftPaddle.y &&
    gameBall.y <= leftPaddle.y + Paddle.HEIGHT
  ) {
    gameBall.speedX *= -1;
    gameBall.speedY = gameBall.y - (leftPaddle.y + Paddle.HEIGHT / 2) * 0.01;
  }

  // Ball collision with right paddle
  if (
    gameBall.x + gameBall.size >= rightPaddle.x &&
    gameBall.y >= rightPaddle.y &&
    gameBall.y <= rightPaddle.y + Paddle.HEIGHT
  ) {
    gameBall.speedX *= -1;
    gameBall.speedY = gameBall.y - (rightPaddle.y + Paddle.HEIGHT / 2) * 0.01;
  }

  // Left paddle controls
  leftPaddle.y = mouseY - Paddle.HEIGHT / 2;

  // Right paddle super AI
  rightPaddle.y = gameBall.y - Paddle.HEIGHT / 2;

  // Win condition
  if (gameBall.x <= 0) {
    noLoop();
    console.log("Right player wins!");
  }
  if (gameBall.x >= width) {
    noLoop();
    console.log("Left player wins!");
  }

  console.log("Y:", gameBall.speedY, " X:", gameBall.speedX);
}
