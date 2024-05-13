class Circle {
    static SPEED = 10;

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    moveRight() {
        this.x += Circle.SPEED;
        this.x = constrain(this.x, 0 + this.radius / 2, width - this.radius / 2);
    }
    
    moveLeft() {
        this.x -= Circle.SPEED;
        this.x = constrain(this.x, 0 + this.radius / 2, width - this.radius / 2);
    }

    moveUp() {
        this.y -= Circle.SPEED;
        this.y = constrain(this.y, 0 + this.radius / 2, height - this.radius / 2);
    }
    
    moveDown() {
        this.y += Circle.SPEED;
        this.y = constrain(this.y, 0 + this.radius / 2, height - this.radius / 2);
    }
}