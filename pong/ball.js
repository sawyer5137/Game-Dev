class Ball {
  constructor(x, y, speedX, speedY, size) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
  }

  draw() {
    rect(this.x, this.y, this.size);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Reflect off the top and bottom edges
    if (this.y < 0 || this.y + this.size > height) {
      this.speedY *= -1;
    }
  }
}
