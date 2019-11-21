let particle = [];

function setup() {
    createCanvas(500, 500);
    background(30);
    var limit = max(2, floor(random(12/2)) * 2);
    for (var i = 0; i < limit; i++) {
        particle[i] = new Particle(width/2, height/2, width/4, random(-2, 2));
    }
}

function mouseClicked() {
    var limit = max(2, floor(random(12/2)) * 2);
    particle = [];
    for (var i = 0; i < limit; i++) {
        particle[i] = new Particle(width/2, height/2, width/4, random(-2, 2));
    }
}

function draw() {
    background(0, 0, 0, 4);
    stroke(255);
    for (var i = 0; i < particle.length; i++) {
        particle[i].step();
        particle[i].render();
        if ((i+1) % 2 == 0) {
            line(particle[i].pos.x, particle[i].pos.y, particle[i-1].pos.x, particle[i-1].pos.y);
        }
    }
}

class Particle {
    constructor(x, y, radius, speed) {
        this.count = 0;
        this.x = x;
        this.y = y;
        this.r = radius;
        this.speed = speed;
        this.pos = createVector(this.x, this.y);
        this.prev = this.pos;
    }

    render() {
        var constrainX = constrain(this.pos.x, 0, width);
        var constrainY = constrain(this.pos.y, 0, height);
        ellipse(this.pos.x, this.pos.y, 2, 2);
    }

    step() {
        this.pos.x = this.r * cos(this.count * PI / 180) + this.x;
        this.pos.y = this.r * sin(this.count * PI / 180) + this.y;
        this.count += this.speed;
    }
}
