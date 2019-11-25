var color1;
var color2;
var r;
var aAcc = 0.001;
var aVel = 0;
var a = 0;

function setup() {
    createCanvas(500,500);
    color1 = color(random(255), random(255), random(255))
    color2 = color(random(255), random(255), random(255))
    noFill()
}

function draw() {
    // background(255);

    translate(width / 2, height / 2);

    var x = r * cos(a);
    var y = r * sin(a);

    r = 200 * sin(millis() / 10000)
    stroke(lerpColor(color1, color2, map(r, 0, 200, 0, 1)))
    aVel += aAcc
    aVel = constrain(aVel, 0, 0.3);
    a += aVel

    ellipse(x, y, 10, 10);

    if (r == 0) {
        resetColor
    }
}

function resetColor() {
    color1 = color(random(255), random(255), random(255))
    color2 = color(random(255), random(255), random(255))
}
