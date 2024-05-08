const circleDiameter = 50;
const frictionCoefficient = 0.993;

// Initial position of the circle
let circleX = 600;
let circleY = 400;

let xVelocity = 0;
let yVelocity = 0;

let tempX = 0;
let tempY = 0;
let count = 0;

let tailPositions = [];
let tailLength = 10;

function setup() {
  createCanvas(1200, 800);
  textSize(10);
}

function draw() {
  background(220);
  drawTail();

  fill(0, 255, 55);
  circle(circleX, circleY, circleDiameter);

  circleX += xVelocity;
  circleY += yVelocity;

  fill(0, 0, 0);
  text(`X Velocity: ${truncateDecimal(xVelocity)}`, 10, 15);
  text(`Y Velocity: ${truncateDecimal(yVelocity)}`, 10, 30);

  if (Math.abs(xVelocity) < 0.02) {
    xVelocity = 0;
  }
  if (Math.abs(yVelocity) < 0.02) {
    yVelocity = 0;
  }

  applyFriction();
  enforceBoundary();
}

function drawTail() {
  tailPositions.push([circleX, circleY]);

  if (tailPositions.length > tailLength) {
    tailPositions.shift();
  }

  for (let i = 0; i < tailPositions.length - 2; i++) {
    let [x, y] = tailPositions[i];
    noStroke();
    fill(50, 50, 50, 50);
    if (i == 0) {
      fill(100, 100, 0);
    }
    circle(x, y, circleDiameter * i * 0.1);
    stroke(100, 100);
  }
}

function keyPressed() {
  // Pause = SPACE
  console.log(keyCode, count);
  if (keyCode == 32) {
    if (count == 0) {
      tempX = xVelocity;
      tempY = yVelocity;
      yVelocity = 0;
      xVelocity = 0;
      count++;
    } else {
      xVelocity = tempX;
      yVelocity = tempY;
      count = 0;
    }
  }
  // R = Reserse
  if (keyCode == 82) {
    xVelocity *= -1;
    yVelocity *= -1;
  }
  // W = Increase Velocity
  if (keyCode == 87) {
    if (xVelocity && yVelocity == 0) {
      xVelocity = 1;
      yVelocity = 1;
    }
    yVelocity *= 2;
    xVelocity *= 2;
  }
  // S = Decrease Velocity
  if (keyCode == 83) {
    yVelocity /= 2;
    xVelocity /= 2;
  }
}

function applyFriction() {
  if (xVelocity < 0) {
    xVelocity *= frictionCoefficient;
  }
  if (xVelocity > 0) {
    xVelocity *= frictionCoefficient;
  }
  if (yVelocity < 0) {
    yVelocity *= frictionCoefficient;
  }
  if (yVelocity > 0) {
    yVelocity *= frictionCoefficient;
  }
}

function enforceBoundary() {
  if (circleX > width - circleDiameter / 2 || circleX < 0 + circleDiameter / 2) {
    xVelocity *= -1;
  }
  if (circleY > height - circleDiameter / 2 || circleY < 0 + circleDiameter / 2) {
    yVelocity *= -1;
  }
}

function truncateDecimal(num) {
  return Math.floor(num * 100) / 100;
}

function mousePressed() {
  xVelocity = (mouseX - circleX) / 10;
  yVelocity = (mouseY - circleY) / 10;
}
