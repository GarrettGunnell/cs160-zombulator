 // Zombulator by Garrett Gunnell

var population = [];
var fightText = [];
var humanPop = 0;
var zombiePop = 0;
var backgroundColor;
var zombieBackground;
const MIN_SIZE = 25;
const MAX_SIZE = 60;
const POPULATION_SIZE = 200;
const POPULATION_RATIO = 50;

var numFights = 0;

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

	drawPopulationCount();
  drawPopulation();
  movePopulation();
  handleCollisions();
  drawFightText();
  moveFightText();
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

function drawPopulationCount() {
	fill(255);
  textFont("Arial", 12);
  text("Zombies: " + zombiePop, width / 2, 25);
  text("Humans: " + humanPop, width / 2, height - 25);	
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
		isZombie: function() {
			return true
		},
		isHuman: function() {
			return false
		},
		isTouching: function(defender) {
			var d = dist(this.position.x, this.position.y, defender.position.x, defender.position.y);

			if (d < (this.size / 2) + (defender.size / 2)) {
				return true
			} else {
				return false
			}
		},
	};
}

function initializeHuman() {
	return {
		position: createVector(random(100, width - 100), random(height - 150, height - 50)),
		color: color(random(100,200), 200, 255, 200),
		size: random(MIN_SIZE, MAX_SIZE),
		speed: random(0.5,1),
		isHuman: true,
		isZombie: false,
		draw: function() {
			fill(this.color);
			ellipse(this.position.x, this.position.y, this.size, this.size);
		},
		move: function() {
			this.position.sub(0, this.speed);
			this.position.add(random(-1,1), random(-1, 1));
		},
		isTouching: function(defender) {
			return false
		},
		becomeZombie: function() {
			this.move = function() {
				this.position.add(0, this.speed);
				this.position.add(random(-1,1), random(-1, 1));
			};
			this.color = color(random(100,200), 255, random(100,200), 200);
			this.isHuman = false
			this.isZombie = true
		},	
	}
}

function handleCollisions() {
	for (var i = 0; i < POPULATION_SIZE; ++i) {
		var attacker = population[i];
		for (var j = i + 1; j < POPULATION_SIZE; ++j) {
			var defender = population[j];

			if (attacker.isTouching(defender) == true && defender.isHuman == true) {
				print("Fight!");
				population[j].becomeZombie();
				addFightText(defender);
				--humanPop;
				++zombiePop;
			}
		}
	}
}

function initializeFightText(defenderX, defenderY) {
	return {
		position: createVector(defenderX, defenderY),
		alpha: 255,
		font: textFont("Arial", 12),
		stroke: stroke(0,0,0),
		draw: function() {
			fill(255, this.alpha);
			stroke(0, this.alpha);
			textFont("Arial", 15);
			text("Fight!", this.position.x, this.position.y);
		},
		move: function() {
			this.position.sub(0, 1);
			this.alpha -= 3;
		},
	}
}

function addFightText(defender) {
	defenderX = defender.position.x
	defenderY = defender.position.y
	fightText[numFights] = initializeFightText(defenderX, defenderY);
	numFights += 1;
}

function drawFightText() {
	for (var i = 0; i < numFights; ++i) {
		fightText[i].draw();
	};
}

function moveFightText() {
	for (var i = 0; i < numFights; ++i) {
		fightText[i].move();
	};
}