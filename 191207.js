var tree;

function setup() {
    createCanvas(500, 500);
    tree = new Tree();
    tree.add(420);
    for (var i = 0; i < 10; i++) {
        tree.add(round(random(1000)));
    }
    ellipseMode(CENTER);
}

function draw() {
    background(255);
    tree.jiggle();
    tree.display();
}

function Tree() {
    this.root = new Node(null);
}

function Tree(value) {
    this.root = new Node(value);
}

Tree.prototype.add = function(value) {
    if (this.root.value == null) {
        this.root = new Node(value);
    } else {
        this.root.add(value);
    }
}

Tree.prototype.jiggle = function() {
    this.root.jiggle();
}

Tree.prototype.traverse = function() {
    this.root.traverse();
}

Tree.prototype.visit = function(value) {
    if (this.root.visit(value) != null) {
        console.log("Found " + value);
    } else {
        console.log("Not found");
    }
}

Tree.prototype.display = function() {
    this.root.display();
}

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;

    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    this.pos = createVector(random() * width, random() * height);
}

Node.prototype.add = function(value) {
    if (value < this.value) {
        if (this.left == null) {
            this.left = new Node(value);
        } else {
            this.left.add(value);
        }
    } else if (value > this.value) {
        if (this.right == null) {
            this.right = new Node(value);
        } else {
            this.right.add(value);
        }
    }
}

Node.prototype.traverse = function() {
    if (this.left != null) {
        this.left.traverse();
    }
    console.log(this.value);
    if (this.right != null) {
        this.right.traverse();
    }
}

Node.prototype.visit = function(value) {
    if (this.value === value) {
        return value;
    }

    if (this.left != null && value < this.value) {
        if (this.left.visit(value) != null) {
            return value;
        }
    }

    if (this.right != null && value < this.value) {
        if (this.right.visit(value) != null) {
            return value;
        }
    }
}

Node.prototype.display = function() {
    ellipse(this.pos.x, this.pos.y, 40, 40);
    text(this.value, this.pos.x - 12, this.pos.y + 5);

    if (this.left != null) {
        line(this.pos.x, this.pos.y, this.left.pos.x, this.left.pos.y);
        this.left.display();
    }

    if (this.right != null) {
        line(this.pos.x, this.pos.y, this.right.pos.x, this.right.pos.y);
        this.right.display();
    }
}

Node.prototype.jiggle = function() {
    // Center
    var center = createVector(width / 2, height / 2);
    this.acc.sub(this.pos.copy().sub(center));

    if (this.left != null) {
        var dist = this.pos.dist(this.left.pos);
        if (dist < 90) {
            this.acc.add(this.pos.copy().sub(this.left.pos));
        } else if (dist > 200) {
            this.acc.sub(this.pos.copy().sub(this.left.pos));
        }
    }

    if (this.right != null) {
        var dist = this.pos.dist(this.right.pos);
        if (dist < 90) {
            this.acc.add(this.pos.copy().sub(this.right.pos));
        } else if (dist > 200) {
            this.acc.sub(this.pos.copy().sub(this.right.pos));
        }
    }

    if (this.left != null) this.left.acc = this.acc.copy().mult(-1);
    if (this.right != null) this.right.acc = this.acc.copy().mult(floor(random(2) - 1));

    // Limit and apply forces
    this.acc.normalize();
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);

    // Reset acc
    this.acc.mult(0);

    // Calculate more forces
    if (this.left != null) this.left.jiggle();
    if (this.right != null) this.right.jiggle();
}
