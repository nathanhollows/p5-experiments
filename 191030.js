var spacing = 40;

function setup() {
    createCanvas(601, 601);

    colorA = color(128, 191, 173);
    colorB = color(217, 114, 24);
    background(0);


    for (i = 0; i < width / spacing; i++) {
        for (j = 0; j < height / spacing; j++) {
            drawCircle(i * spacing, j * spacing);
        }
    }
}

function draw() {
    drawCircle(round(mouseX / 40) * 40, round(mouseY / 40) * 40, 1);
}

function drawCircle(x, y, dots) {
    noFill();
    length = sqrt(601 * 601 + 601 * 601);
    distance = sqrt(x * x + y * y);
    strokeWeight(4);
    stroke(0);
    ellipse(x + 1, y + 1, 2 * spacing, 2 * spacing);
    ellipse(x - 1, y - 1, 2 * spacing, 2 * spacing);
    if (mouseIsPressed) {
        stroke(0);
    } else {
        stroke(lerpColor(colorA, colorB, distance / length));
    }
    ellipse(x, y, 2 * spacing, 2 * spacing);
}
