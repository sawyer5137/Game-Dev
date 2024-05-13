class Paddle {
  static SPEED = 10;
  static WIDTH = 10;
  static HEIGHT = 90;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  moveUp() {
    this.y -= Paddle.SPEED;
    if (this.y < 0) this.y = 0;
  }

  moveDown() {
    this.y += Paddle.SPEED;
    if (this.y > height - Paddle.HEIGHT) this.y = height - Paddle.HEIGHT;
  }

  draw() {
    rect(this.x, this.y, Paddle.WIDTH, Paddle.HEIGHT);
  }
}
