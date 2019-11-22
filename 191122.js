var balls = [];

function setup() {
    createCanvas(500,500);
    for (var i = 0; i < 4; i++) {
        balls[i] = new Ball(random(width / 6, width - width / 6), height/3, 20, random());
    }
    stroke(255);
    fill(255, 255, 255, 30);
}

function draw() {
    background(30);
    balls.forEach(function(ball) {
        if (mouseIsPressed) {
            ball.applyForce(createVector(0.1,0));
        }
        ball.update();
        ball.edges();
        ball.move();
    });
}

class Ball {
    constructor(x, y, d, m) {
        this.pos = createVector(x, y);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0,0);
        this.diameter = min(max(d / m, 10), 100);
        this.mass = m;
    }

    applyForce(force) {
        this.acceleration.add(force.mult(this.mass))
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(12);
        this.pos.add(this.velocity);
        this.acceleration.set(0, 0.1);
    }

    move() {
        ellipse(this.pos.x, this.pos.y, this.diameter);
    }

    edges() {
        if (this.pos.x < this.diameter / 2) {
            this.pos.x = this.diameter / 2;
            this.velocity.x *= -0.9;
        }
        if (this.pos.y <= this.diameter / 2) {
            this.pos.y = this.diameter / 2;
            this.velocity.y *= -0.95;
        }
        if (this.pos.x > width - this.diameter / 2) {
            this.pos.x = width - this.diameter / 2;
            this.velocity.x *= -0.9;
        }
        if (this.pos.y > height - this.diameter / 2) {
            this.pos.y = height - this.diameter / 2;
            this.velocity.y *= -0.95;
        }
    }
}
