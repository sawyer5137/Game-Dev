let birdY = 200;
let birdX = 100;
let birdVelocity = 0;
const birdSize = 50;
const flapHeight = 10;

let pipeArray = [];
let pipeFrequency = 100;
let pipeWidth = 15;
let pipeGap = 100;
let pipeSpeed = -2;

let count = 0;


function setup() {
    createCanvas(400, 600);
}

function draw() {
    background(200,200,200);
    text(birdVelocity, 10, 10);
    ellipse(birdX, birdY, 50, 50);

    birdY += birdVelocity;
    
    if(birdY < 0 + birdSize / 2) {
        birdVelocity = 0;
    }
    if (birdY < height - birdSize / 2) {
        gravity();
    }

    if(count % pipeFrequency === 0) {
        createPipe();
      }
    drawPipe();

    birdY = constrain(birdY, 0 + birdSize / 2, height - birdSize / 2);
    count++;
}

function createPipe() {
    let pipeHeight = random(50, height - 50);
    let x = width;
    pipeArray.push( [pipeHeight, x]);
}

function drawPipe() {
    for (let i = 0; i < pipeArray.length; i++) {
        rect(pipeArray[i][1], 0, pipeWidth, pipeArray[i][0] - pipeGap);
        rect(pipeArray[i][1], pipeArray[i][0] + pipeGap, pipeWidth, height - pipeArray[i][0] - pipeGap);
        pipeArray[i][1] += pipeSpeed;

        //removes pipes from array when they move off screen
        if (pipeArray[i][1] < 0 - pipeWidth) {
            pipeArray.splice(i, 1);
        }
    }

}

function keyPressed() {
    if (key === " ") {
        birdVelocity = -1 * flapHeight;
    }
} 

function gravity() {
    birdVelocity += 1;
}