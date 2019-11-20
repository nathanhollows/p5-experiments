let mass = 1;
let nX = 0;
let nY = 0;
let max_force = 3;
let max_speed = 5;
let dX = 1;
let dY = 1;
let next = [0,0];
let steering_direction = [0,0];
let steering_force = 1; 
let acceleration = 1;
let velocity = [1,1];
let pos = [1,1];

function setup() {
    createCanvas(500, 500);
    ellipseMode(CENTER);
    angleMode(DEGREES);
    fill(0);
}

function sForce() {
    var x = min(max(mouseX, 1), width);
    var y = min(max(mouseY, 1), height);

    var dot = Math.sqrt(x * velocity[0] + y * velocity[1]);
    var angle = acos(dot / (magnitude(x, y) * magnitude(velocity[0], velocity[1])));

    return angle;
    if (angle > 180) {
        return map(angle, 180, 360, max_force, 0);
    } else {
        return map(angle, 0, 180, 0, max_force);
    }
}

function magnitude(x, y) {
    return sqrt(x * x + y * y);
}

function vMag() {
    return sqrt((pos[0] - velocity[0]) * (pos[0] - velocity[0]) + (pos[1] - velocity[1]) * (pos[1] - velocity[1]));
}

function calculateNext() {
    var x = min(max(mouseX, 0), width);
    var y = min(max(mouseY, 0), height);

    var dX = x - pos[0];
    var dY = y - pos[1];

    next[0] = dX / magnitude(dX, dY);
    next[1] = dY / magnitude(dY, dY);
}

function draw() {
    background(255);
    fill(0);

    ellipse(pos[0], pos[1], 9, 9);

    steering_force = sForce();
    acceleration = vMag() / (magnitude(pos[0], pos[1]) * magnitude(velocity[0], velocity[1]));

    // velocity[0] = min(velocity[0] + acceleration, max_speed);
    // velocity[1] = min(velocity[1] + acceleration, max_speed);
    
    calculateNext();

    pos[0] = pos[0] + velocity[0] * acceleration * max_speed;
    pos[1] = pos[1] + velocity[1] * acceleration * max_speed;

    velocity[0] = next[0] + velocity[0] * acceleration;
    velocity[1] = next[1] + velocity[1] * acceleration;


    if (pos[0] > width) {
        pos[0] = width - 9;
    }

    if (pos[1] > height) {
        pos[1] = height - 9;
    }

    if (pos[0] < 0) {
        pos[0] = 4;
    }

    if (pos[1] < 0) {
        pos[1] = 4;
    }
}

