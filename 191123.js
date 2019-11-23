var time = 0;
var run = 0;
var color1;
var color2;
var bg;
var pos;
var acc;
var vel;

function setup() {
    createCanvas(500,500);
    fill(255);
    noStroke();
    pos = createVector(1, 0);
    vel = createVector(0, 0);
    acc = createVector(0, 0);
    color1 = color("#FFF5B5");
    color2 = color("#D15447");
    bg = "#004769";
    background(bg);
}

function draw() {
    time += 0.01;
    acc = createVector(noise(1,time) - 0.5, noise(time, 1) - 0.5);
    mouse = createVector(mouseX, mouseY);
    lookAhead = pos.copy();
    lookAhead.mag(150);
    if (lookAhead.dist(mouse) < 75) {
        if (run < 1) {
            run += 0.05;
        }
        lookAhead.sub(mouse);
        lookAhead.normalize();
        lookAhead.mult(0.5);
        acc.add(lookAhead);
    } else if (run > 0) {
        run -= 0.05;
    }
    fill(lerpColor(color1, color2, run));
    vel.add(acc);
    vel.limit(4);
    pos.add(vel);
    ellipse(pos.x, pos.y, 4, 4);
    checkEdges();
    fill(255);
}

function mousePressed() {
    background(bg);
}

function checkEdges() {
    if (pos.x > width) {
        pos.x = 0;
    }
    if (pos.y > height) {
        pos.y = 0;
    }
    if (pos.y < 0) {
        pos.y = height;
    }
    if (pos.x < 0) {
        pos.x = width;
    }
}
