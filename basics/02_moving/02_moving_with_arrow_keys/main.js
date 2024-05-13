let speed = 5;

function setup() {
    createCanvas(600, 600);
    let circleObj = new Circle(width / 2, height / 2, 50);
}

function draw() {
    background(230, 230, 250);
    circle(circleX, circleY, radius * 2);
    if (keyIsDown(37)) {
        circleObj.moveLeft();
    } else if (keyIsDown(39)) {
        circleObj.moveRight();
    }
    if (keyIsDown(38)) {
        circleObj.moveUp();
    } else if (keyIsDown(40)) {
        circleObj.moveDown();
    }
}

function keyPressed() {
    console.log(keyCode);
}