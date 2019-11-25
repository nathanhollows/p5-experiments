var offset = 0
var waves = []

function setup() {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    createCanvas(windowWidth,500);
    background(30);
    createLines()
}

function createLines() {
    var count = 4 + round(random(4));
    var noisy = random()
    waves = []
    for (var i = 0; i < count; i++) {
        waves[i] = new Lines(
            random(50, 100),    // Height
            random(0.41,4), // step
            random(10000),        // Initial offset
            -randomGaussian(2,3) / 100, // Speed
            ceil(randomGaussian(2,1)) // Weight
        )
    }
}

function mouseClicked() {
    createLines()
}

function draw() {
    background(30)

    for (var i = 0; i < waves.length; i++) {
        waves[i].show()
    }
}

class Lines {
    constructor(h, s, os, o, w) {
        this.height = h;
        this.top = height / 2 + h / 2
        this.bottom = height / 2 - h / 2
        this.step = s;
        this.offset = os;
        this.offsetStep = o;
        this.weight = w
        this.color = color(random(100) + 155, random(100) + 155, random(205) + 50)
    }

    show() {
        noFill()
        strokeWeight(this.weight)
        stroke(this.color)

        beginShape()
        for (var x = 0; x < width; x++) {
            var angle = this.offset + x * 0.01
            var y = map(sin(angle), -this.step, this.step, this.top, this.bottom)
            vertex(x, y)
        }
        endShape()
        this.offset += this.offsetStep
        this.step += cos(noise(this.offset) + this.offset) / 1000
        this.top += cos(this.offset) / 60
        this.bottom += cos(this.offset) / 60
    }

}
