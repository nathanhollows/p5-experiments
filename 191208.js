var cols, rows;
var size = 20;
var grid = [];
var current;
var stack = [];
var wall = 100;
var path = 255;
var info;

function setup() {
    createCanvas(520,520);
    frameRate(20);
    cols = floor(width / size);
    rows = floor(height / size);

    info = document.createElement("p");
    document.body.appendChild(info);

    generate();
}

function mousePressed() {
    generate();
    return;
}

function generate() {
    background(255);

    grid = [];
    for (var j = 0; j < rows; j++) { // Rows
        for (var i = 0; i < cols; i++) { // Columns
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0,0];
    stack = [];
    stack.push(current);

    while (stack.length > 0) {
        current.visited = true;
        var next = current.checkNeighbours();
        if (next) {
            removeWalls(current, next);
            next.visited = true;
            stack.push(next);
            current = next;
        } else {
            current = stack.pop();
        }
    }
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

}

function draw() {
    var x = round((mouseX + size / 2) / size * 2) - 1;
    var y = round((mouseY + size / 2) / size * 2) - 1;
    info.textContent = `x: ${x} y: ${y}`;
}


function Cell(i, j) {
    // Position
    this.i = i;
    this.j = j;

    // Visited
    this.visited = false;

    // Walls; Top, right, bottom, left
    this.walls = [true, true, true, true];
}

Cell.prototype.show = function() {
    var x = this.i * size;
    var y = this.j * size;

    if (this.visited) {
        fill(path);
        noStroke();
        rect(x + size / 4, y + size / 4, size/2, size/2);
    }

    // Draw walls
    noStroke();
    fill(wall);
    if (this.walls[0]) {
        rect( x - size / 4, y, size * 1.5, size / 4); // Top
    }
    if (this.walls[1]) {
        rect(x + size*0.75, y - size/4, size/4, size*1.5); // Right
    }
    if (this.walls[2]) {
        rect(x - size/4, y + size * 0.75, size*1.5, size/4); // Bottom
    }
    if (this.walls[3]) {
        rect(x, y - size/4, size/4, size*1.5); // Left
    }

}

Cell.prototype.checkNeighbours = function() {
    var neighbours = [];

    var top = grid[this.index(this.i, this.j-1)];
    var right = grid[this.index(this.i + 1, this.j)];
    var bottom = grid[this.index(this.i, this.j + 1)];
    var left = grid[this.index(this.i - 1, this.j)];

    if (top && !top.visited) {
        neighbours.push(top);
    }
    if (right && !right.visited) {
        neighbours.push(right);
    }
    if (bottom && !bottom.visited) {
        neighbours.push(bottom);
    }
    if (left && !left.visited) {
        neighbours.push(left);
    }

    if (neighbours.length > 0) {
        var r = floor(random(0, neighbours.length));
        return neighbours[r];
    } else {
        return undefined;
    }
}

Cell.prototype.index = function(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
    return i + j * cols;
}

function removeWalls(a, b) {
    if (a.i > b.i) {
        // Moving left
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (a.i < b.i) {
        // Moving right
        a.walls[1] = false;
        b.walls[3] = false;
    } else if (a.j < b.j) {
        // Moving down
        a.walls[2] = false;
        b.walls[0] = false;
    } else if (a.j > b.j) {
        // Moving up
        a.walls[0] = false;
        b.walls[2] = false;
    }
}
