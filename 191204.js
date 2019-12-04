function makeArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cell = 15;
let cols = 40;
let rows = 40;

function setup() {
    grid = makeArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    
    createCanvas(cell * cols,cell * rows);
    fill("#9D0F69");
    stroke("#E8EDDE");
    frameRate(20);
}

function draw() {
    let temp = makeArray(cols, rows);
    background("#E8EDDE");

    if (mouseIsPressed) {
        if (mouseX < cols * cell && mouseY < rows * cell) {
            grid[round(mouseX / cell)][round(mouseY / cell)] = 1;
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] === 1) {
                rect(i * cell, j * cell, cell - 1, cell);
            }

            temp[i][j] = newState(i,j);
        }
    }

    grid = temp;
}

function newState(x,y) {
    let neighbours = 0;
    let state = grid[x][y];

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j ===0) {
                continue;
            }
            if (x + i < 0 || x + i >= cols || y + j < 0 || y + j >=rows) {
                continue;
            }
            if (grid[x + i][y + j] === 1) {
                neighbours++;
            }
        }
    }

    if (state === 1 && (neighbours === 2 || neighbours === 3)) return 1;
    if (state === 0 && neighbours === 3) return 1;
    return 0;
}
