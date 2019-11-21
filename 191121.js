var ball;

function setup() {
    createCanvas(600, 600);
    ball = new Ball();
}

function draw() {
    background(255, 255, 255, 10);
    ball.update();
    ball.move();
}

class Ball {
    constructor() {
        this.location = createVector(width/2, height/2);
        this.velocity = createVector(0.1, 0.1);
        this.acceleration = createVector(0,0);
        this.time = 0;
        this.color1 = color("#05F2AF");
        this.color2 = color("#D91872");
    }

    update() {
        this.acceleration = createVector(mouseX, mouseY);
        this.acceleration.sub(this.location);
        var limit = 7;
        if (this.acceleration.mag() < 50) {
            limit = map(this.acceleration.mag(), 0, 50, 0, 7);
        } else {
            this.time += 0.01;
        }
        if (mouseIsPressed) {
            this.acceleration.mult(-map(this.acceleration.mag(), 0, 100, 0, 1));
            this.acceleration.mult(this.time);
            stroke(color("red"));
        } else {
            stroke(lerpColor(this.color1, this.color2, cos(this.time)));
        }
        this.acceleration.normalize();
        this.velocity.add(this.acceleration);
        this.velocity.limit(limit);
        this.location.add(this.velocity);
    }

    move() {
        ellipse(this.location.x, this.location.y, 20, 20);
    }

}
