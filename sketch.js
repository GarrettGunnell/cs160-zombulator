 // Zombulator by Garrett Gunnell

var population = [];
var humanPop = 0;
var zombiePop = 0;
var backgroundColor;
const MIN_SIZE = 25;
const MAX_SIZE = 60;
const POPULATION_SIZE = 200;
const POPULATION_RATIO = 50;


function preload() {
	zombieBackground = loadImage("https://i.imgur.com/Own5Doo.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundColor = color(254, 247, 255);
	initializePopulation();
}

function draw() {
	background(zombieBackground);
  	noStroke();

  	fill(255);
  	textFont("Arial", 10);
  	text("Zombies: " + zombiePop, width / 2, 25);
  	text("Humans: " + humanPop, width / 2, height - 25);

  	drawPopulation();
  	movePopulation();
}

function initializePopulation() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		x = random(0, 100);

		if (x <= POPULATION_RATIO) {
			population[i] = initializeZombie();
			++zombiePop;
		} else {
			population[i] = initializeHuman();
			++humanPop;
		}
	}
}

function drawPopulation() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		population[i].draw();
	}
}

function movePopulation() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		population[i].move();
	}
}

function initializeZombie() {
	return {
		position: createVector(random(100, width - 100), random(50, 150)),
		size: random(MIN_SIZE,MAX_SIZE),
		color: color(random(100,200), 255, random(100,200), 200),
		speed: random(0.5,1),
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);	
		},
		move: function() {
			this.position.add(0, this.speed);
			this.position.add(random(-1,1), random(-1,1));
		},
	};
}

function initializeHuman() {
	return {
		position: createVector(random(100, width - 100), random(height - 150, height - 50)),
		color: color(random(100,200), 200, 255, 200),
		size: random(MIN_SIZE, MAX_SIZE),
		speed: random(0.5,1),
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
			this.position.sub(0, this.speed);
			this.position.add(random(-1,1), random(-1, 1));
		},
	}
}
