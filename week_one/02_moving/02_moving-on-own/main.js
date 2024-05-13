let circleX, circleY;
let radius = 50;

let Xdirection = 1;
let Ydirection = 1;

let XVelocity = 10;
let YVelocity = 3;

function setup() {
    createCanvas(500, 500);
    circleX = width/2;
    circleY = height/2;
}

function draw() {
    background(220);

    if(circleX > width - radius / 2 || circleX < 0 + radius / 2) {
        Xdirection = -Xdirection;
    }

    if(circleY > height - radius / 2 || circleY < 0 + radius / 2) {
        Ydirection = -Ydirection;
    }

    circleX += XVelocity * Xdirection;
    circleY += YVelocity * Ydirection;

    ellipse(circleX, circleY, radius);

}