let playerX = 400;
let playerY = 400;

let playerDiameter = 25;

let speed = 5;

let bulletSpeed = 10;
let bulletSize = 5;
let bulletArray = [];

let zombieArray = [];
const zombieMaxSize = 30;
const zombieMinSize = 10;
let zombieFrequency = 100;
let zombieSpeed = 2;

let count = 0;
let killCount = 0;

//Sounds

function preload() {
  soundFormats("mp3", "ogg");
  zombie1 = loadSound("assets/zombie1.mp3");
  zombie2 = loadSound("assets/zombie2.mp3");
  zombie3 = loadSound("assets/zombie3.mp3");

  zombieSpawn = loadSound("assets/zombieSpawn.mp3");
}

function setup() {
  createCanvas(600, 600);
}

// ________________________DRAW LOOP________________________
function draw() {
  background(230, 230, 250);

  // Update player movement
  if (keyIsDown(65)) {
    playerX -= speed;
  } else if (keyIsDown(68)) {
    playerX += speed;
  }
  if (keyIsDown(87)) {
    playerY -= speed;
  } else if (keyIsDown(83)) {
    playerY += speed;
  }

  // Keep player within canvas bounds
  playerX = constrain(playerX, 0 + playerDiameter / 2, width - playerDiameter / 2);
  playerY = constrain(playerY, 0 + playerDiameter / 2, height - playerDiameter / 2);

  // Draw the bullets
  drawBullet();

  // Draw the zombies
  drawZombies();

  // Draw the player
  fill(25, 25, 25);
  circle(playerX, playerY, playerDiameter);

  if (count % zombieFrequency === 0) {
    generateZombie();
    console.log("Count", count, "Frequency", zombieFrequency);
  }

  // Check for player death
  checkDeath();

  // Display kill count
  fill(0);
  text("Kill Count: " + killCount, 10, 10);
  count++;
}

//________________________SHOOTING MECHANICS________________________
function shoot(direction) {
  bulletArray.push({
    x: playerX,
    y: playerY,
    direction: direction,
    xSpeed: bulletSpeed,
    ySpeed: bulletSpeed,
  });
}

function drawBullet() {
  for (let i = 0; i < bulletArray.length; i++) {
    if (bulletArray[i].direction === "up") {
      bulletArray[i].y -= bulletArray[i].ySpeed;
    } else if (bulletArray[i].direction === "down") {
      bulletArray[i].y += bulletArray[i].ySpeed;
    } else if (bulletArray[i].direction === "left") {
      bulletArray[i].x -= bulletArray[i].xSpeed;
    } else if (bulletArray[i].direction === "right") {
      bulletArray[i].x += bulletArray[i].xSpeed;
    }
    
    fill(255, 0, 0);
    circle(bulletArray[i].x, bulletArray[i].y, bulletSize);
    if (bulletArray[i].x > width || bulletArray[i].x < 0 || bulletArray[i].y > height || bulletArray[i].y < 0) {
      bulletArray.splice(i, 1);
    }
  }
}

// ________________________ZOMBIE MECHANICS________________________
//Zombie generation
function generateZombie() {
  zombieArray.push({
    size: Math.floor(Math.random() * (zombieMaxSize - zombieMinSize + 1)) + zombieMinSize,
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  });
  zombieSpawn.play();
}

let previousZombieSound;
function drawZombies() {
  let removeArray = [];
  for (let i = 0; i < zombieArray.length; i++) {
    fill(0, 255, 0);
    circle(zombieArray[i].x, zombieArray[i].y, zombieArray[i].size);
    
    // Zombie movement
    if (playerX < zombieArray[i].x) {
      zombieArray[i].x -= zombieSpeed;
    } else if (playerX > zombieArray[i].x) {
      zombieArray[i].x += zombieSpeed;
    }
    if (playerY < zombieArray[i].y) {
      zombieArray[i].y -= zombieSpeed;
    } else if (playerY > zombieArray[i].y) {
      zombieArray[i].y += zombieSpeed;
    }
    
    // Zombie bullet collision
    for (let j = 0; j < bulletArray.length; j++) {
      if (
        dist(bulletArray[j].x, bulletArray[j].y, zombieArray[i].x, zombieArray[i].y) <
        bulletSize / 2 + zombieArray[i].size / 2
      ) {
        removeArray.push(i);
        bulletArray.splice(j, 1);
        if (killCount > 0 && killCount % 10 === 0) {
          zombieFrequency -= 10;
        }
      }
    }
    
    // Zombie to zombie collision
    for (let j = 0; j < zombieArray.length; j++) {
      if (
        i !== j &&
        dist(zombieArray[i].x, zombieArray[i].y, zombieArray[j].x, zombieArray[j].y) <
        zombieArray[i].size / 2 + zombieArray[j].size / 2
      ) {
        if (zombieArray[i].x < zombieArray[j].x) {
          zombieArray[i].x -= zombieSpeed;
          zombieArray[j].x += zombieSpeed;
        } else if (zombieArray[i].x > zombieArray[j].x) {
          zombieArray[i].x += zombieSpeed;
          zombieArray[j].x -= zombieSpeed;
        }
        if (zombieArray[i].y < zombieArray[j].y) {
          zombieArray[i].y -= zombieSpeed;
          zombieArray[j].y += zombieSpeed;
        } else if (zombieArray[i].y > zombieArray[j].y) {
          zombieArray[i].y += zombieSpeed;
          zombieArray[j].y -= zombieSpeed;
        }
      }
    }
  }
  
  // Remove dead zombies
  for (let i = 0; i < removeArray.length; i++) {
    zombieArray.splice(removeArray[i], 1);
    killCount++;

    let randomZombieSound;
    if (previousZombieSound) {
      randomZombieSound = generateUniqueRandomNumber(0, 2, previousZombieSound);
    } else {
      randomZombieSound = Math.floor(Math.random() * 3);
    }

    if (randomZombieSound === 0) {
      zombie1.play();
      previousZombieSound = 0;
    } else if (randomZombieSound === 1) {
      zombie2.play();
      previousZombieSound = 1;
    } else if (randomZombieSound === 2) {
      zombie3.play();
      previousZombieSound = 2;
    }
  }
}

// ________________________OTHER________________________
function checkDeath() {
  for (let i = 0; i < zombieArray.length; i++) {
    if (dist(playerX, playerY, zombieArray[i].x, zombieArray[i].y) < playerDiameter / 2 + zombieArray[i].size / 2) {
      noLoop();
      fill(0);
      textSize(50);
      text("You Died", width / 2 - 100, height / 2);
    }
    textSize(12);
  }
}

function generateUniqueRandomNumber(min, max, previous) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  while (num === previous) {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return num;
}

// KEYBOARD INPUT
function keyPressed() {
  if (key === "ArrowDown") {
    shoot("down");
  } else if (key === "ArrowUp") {
    shoot("up");
  } else if (key === "ArrowLeft") {
    shoot("left");
  } else if (key === "ArrowRight") {
    shoot("right");
  }
}
