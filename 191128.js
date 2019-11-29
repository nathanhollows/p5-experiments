/**
 * Snake Game
 * Nathan Hollows
 * Made using P5 JS
 */

let score = 0;
let highScore = 0;

let snake;
let berry;
const cell = 12;
const minFrames = 5;
const startingSpeed = 10;
let frames = startingSpeed;
let currFrames = startingSpeed;
let dead = false;

let inputs = [];

const fColor = "#CEF09D"
const bColor = "#083643"
const cColor = "#B1E001"

function setup() {
    createCanvas(492,492);
    ellipseMode(CENTER);

    gameBegin();
}

function draw() {
    // Show berry
    berry.display();
    // Direct the snake
    snake.direct();
    // Draw snake
    snake.move();
    // Kill the snake
    if (snake.death()) {
        gameEnd();
    } else {
        snake.display();
    }
    // Slow the snake
    if (snake.slow()) {
        currFrames = frames;
        frames = minFrames;
    } else if (frames === minFrames) {
        frames = currFrames;
    }
    frameRate(frames);
}

function gameEnd() {
    dead = true;
    rectMode(CENTER);
    strokeWeight(4);
    fill(bColor);
    stroke(255);
    rect(width/2, height/2, width * 0.8, height * 0.4)

    if (score > highScore) {
        highScore = score;
    }

    rectMode(CORNER);
    fill(255);
    strokeWeight(0);
    textSize(42);
    textAlign(CENTER, CENTER);
    text('GAME OVER', 0, height * 0.41, width);
    textSize(18);
    text("PRESS [SPACE] TO RESTART", 0, height * 0.53, width);
    text(`Your Score: ${score} \t High Score: ${highScore}`, 0, height * 0.63 , width);
    score = 0;
    noLoop();
}

function gameBegin() {
    dead = false;
    frames = startingSpeed;
    background(bColor);
    snake = new Snake();
    berry = new Berry();
    loop();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        inputs.push(createVector(-cell, 0));
    } else if (keyCode === RIGHT_ARROW) {
        inputs.push(createVector(cell, 0));
    } else if (keyCode === UP_ARROW) {
        inputs.push(createVector(0, -cell));
    } else if (keyCode === DOWN_ARROW) {
        inputs.push(createVector(0, cell));
    } else if (keyCode === 32 && dead) {
        gameBegin();
    }
}

class Berry {
    constructor() {
        this.pos = createVector(
            round(random(width - 2 * cell) / cell) * cell + cell * 1.5, 
            round(random(height - 2 * cell) / cell) * cell + cell * 1.5);
    }

    display() {
        fill(cColor);
        ellipse(
            round(this.pos.x / cell) * cell - cell /2,
            round(this.pos.y / cell) * cell - cell /2,
            cell
        )
        fill(255)
    }
}

class Snake {
    constructor() {
        this.segments = [
            createVector(
                round(width/2 / cell) * cell - cell / 2, 
                round(height / cell) * cell - cell / 2 )
        ];
        this.direction = createVector(0, - cell);
        this.length = 1;
    }

    direct(x, y) {
        if (inputs.length > 0) {
            var newDirection = inputs[0];
            if (!newDirection.copy().mult(-1).equals(this.direction)) {
                this.direction = newDirection;
            }
            inputs.pop(0);
        }

    }

    move() {
        var newCell = this.segments[0].copy();
        newCell.add(this.direction);
        // Move head of the snake
        this.segments.unshift(newCell);
    }

    display() {
        ellipse(
             this.segments[0].x, this.segments[0].y, cell
        );

        if (!this.eat()) {
            fill(bColor);
            stroke(bColor)
            strokeWeight(1);
            ellipse(
                this.segments[this.length].x,
                this.segments[this.length].y,
                cell
            );
            fill(255);
            this.segments.pop(this.length);
        }

    }

    slow() {
        var next = this.segments[0].copy().add(this.direction);

        if (next.x < 0 || next.x > width
            || next.y < 0 || next.y > height) {
            return true;
        }

        return false;
    }

    death() {
        if (this.segments[0].x < 0 || this.segments[0].x > width
            || this.segments[0].y < 0 || this.segments[0].y > height) {
            return true;
        }

        for (var i = 1; i <= this.length; i++) {
            if (this.segments[i].equals(this.segments[0])) {
                return true;
            }
        }
        return false;
    }

    eat() {
        if (this.segments[0].dist(berry.pos) === 0) {
            berry = new Berry();
            // Add tail to snake
            this.length++;
            frames++;
            if (frames > 24) {
                frames = 24;
            }
            score++;
            return true;
        } else {
            return false;
        }
    }
}
