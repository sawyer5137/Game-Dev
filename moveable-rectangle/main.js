const canvasWidth = 1200;
const canvasHeight = 800;

const rectSize = 100;
let rectX = canvasWidth / 2 - rectSize / 2;
let rectY = canvasHeight / 2 - rectSize / 2;

const obstacleSize = 200;
let obstacleX = 300;
let obstacleY = 400;

const moveSpeed = 50;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(220);
  if (mouseIsPressed) {
    rectX = mouseX - rectSize / 2;
    rectY = mouseY - rectSize / 2;
  }

  if (mouseOverRect() && mouseIsPressed) {
    fill(0, 210, 50);
  } else {
    fill(210, 50, 210);
  }

  rectX = constrain(rectX, 0, canvasWidth - rectSize);
  rectY = constrain(rectY, 0, canvasHeight - rectSize);

  rect(rectX, rectY, rectSize, rectSize);

  fill(210, 50, 50);
  rect(obstacleX, obstacleY, obstacleSize, obstacleSize);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    rectY -= moveSpeed;
  } else if (keyCode === DOWN_ARROW) {
    rectY += moveSpeed;
  } else if (keyCode === LEFT_ARROW) {
    rectX -= moveSpeed;
  } else if (keyCode === RIGHT_ARROW) {
    rectX += moveSpeed;
  }
}

function mouseOverRect() {
  if (mouseX >= rectX && mouseX <= rectX + rectSize && mouseY >= rectY && mouseY <= rectY + rectSize) {
    return true;
  } else {
    return false;
  }
}
